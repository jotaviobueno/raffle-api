import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateCheckoutDto,
  JobQuotasDto,
  SearchOrderDto,
  SendEmailDto,
  UserRoleConsumerDto,
} from 'src/domain/dtos';
import {
  FindAllResultEntity,
  AsaasEventDto,
  OrderEntity,
  OrderWithRelationsEntity,
  orderQueryWithRelations,
} from 'src/domain/entities';
import { OrderRepository } from '../repositories/order.repository';
import { CartService } from '../../cart/services/cart.service';
import { PaymentService } from '../../payment/services/payment.service';
import { OrderStatusService } from './order-status.service';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { QueryBuilder, prettyCardNumber } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import * as creditCardType from 'credit-card-type';
import { InjectQueue } from '@nestjs/bull';
import { JOBS_ENUM, ORDER_STATUS_ENUM, QUEUES_ENUM } from 'src/common/enums';
import { Queue } from 'bull';

@Injectable()
export class OrderService
  implements
    ServiceBase<OrderEntity | OrderWithRelationsEntity, CreateCheckoutDto>
{
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly cartService: CartService,
    private readonly paymentService: PaymentService,
    private readonly orderStatusService: OrderStatusService,
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @InjectQueue(QUEUES_ENUM.QUOTAS)
    private readonly quotasQueue: Queue<JobQuotasDto>,
    @InjectQueue(QUEUES_ENUM.EMAIL)
    private readonly emailQueue: Queue<SendEmailDto>,
    @InjectQueue(QUEUES_ENUM.USER_ROLE)
    private readonly userRoleQueue: Queue<UserRoleConsumerDto>,
  ) {}

  async create(dto: CreateCheckoutDto): Promise<OrderWithRelationsEntity> {
    const cart = await this.cartService.findById(dto.cartId);

    if (cart.cartItems.length === 0)
      throw new HttpException('Empty cart.', HttpStatus.UNPROCESSABLE_ENTITY);

    if (!cart.cartTotal)
      throw new HttpException(
        'Cart total do not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    if (!cart.cartPayment)
      throw new HttpException(
        'Cart payment do not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    if (
      cart.cartPayment.paymentMethod.code === 'credit.card' &&
      cart.cartTotal.total < 5
    )
      throw new HttpException(
        'For credit card charges, an amount greater than 5 is required',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    for (const item of cart.cartItems) {
      if (item.raffleId) {
        if (
          new Date() > item.raffle.drawDateAt ||
          item.raffle.progressPercentage >= 100 ||
          item.raffle.payeds >= item.raffle.totalNumbers ||
          item.raffle.isFinished
        )
          throw new HttpException(
            'Raffle has already been completed',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );

        if (
          ((item.raffle.payeds + item.quantity) / item.raffle.totalNumbers) *
            100 >
          100
        )
          throw new HttpException(
            'You need to decrease your order quantity',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
      }
    }

    const orderStatus = await this.orderStatusService.findByCode(
      ORDER_STATUS_ENUM.AWAIT_CALLBACK,
    );

    return this.prismaService.$transaction(
      async (tx) => {
        let query = {};

        const response = await this.paymentService.process({ dto, cart });

        switch (cart.cartPayment.paymentMethod.code) {
          case 'pix':
            query = {
              orderPayment: {
                create: {
                  addressId: cart.cartPayment.addressId,
                  method: cart.cartPayment.method,
                  paymentMethodId: cart.cartPayment.paymentMethodId,
                  paymentLink: response.data?.paymentLink,
                  orderPix: {
                    create: {
                      copyPaste: response.data.pix.payload,
                      image: response.data.pix.encodedImage,
                      expiratAt: new Date(response.data.pix.expirationDate),
                    },
                  },
                },
              },
            };
            break;
          case 'credit.card':
            query = {
              orderPayment: {
                create: {
                  addressId: cart.cartPayment.addressId,
                  status: response.data.status,
                  method: cart.cartPayment.method,
                  paymentLink: response.data.paymentLink,
                  paymentMethodId: cart.cartPayment.paymentMethodId,
                  orderCreditCard: {
                    create: {
                      number: prettyCardNumber(dto.number),
                      brand: creditCardType(dto.number)[0].niceType,
                      cvv: dto.cvv,
                      name: dto.holder,
                      expirationMonth: dto.expirationMonth,
                      token: response.data?.creditCardToken,
                      expirationYear: dto.expirationYear,
                    },
                  },
                },
              },
            };
            break;
          case 'bank.slip':
            query = {
              orderPayment: {
                create: {
                  addressId: cart.cartPayment.addressId,
                  method: cart.cartPayment.method,
                  paymentMethodId: cart.cartPayment.paymentMethodId,
                  paymentLink: response.data.paymentLink,
                  orderBankSlip: {
                    create: {
                      ourNumber: response.data.bankSlip.nossoNumero,
                      identificationField:
                        response?.data?.bankSlip.identificationField,
                      barCode: response.data.bankSlip.barCode,
                    },
                  },
                },
              },
            };
            break;
        }

        const order = await tx.order.create({
          data: {
            ...query,
            externalReference: response.data.externalReference,
            ip: dto.ip,
            userAgent: dto.userAgent,
            orderCustomer: {
              create: {
                document: cart.customer.document,
                email: cart.customer.email,
                name: cart.customer.name,
                mobilePhone: cart.customer.mobilePhone,
                phone: cart.customer.phone,
                customer: {
                  connect: {
                    id: cart.customer.id,
                  },
                },
                birthDate: cart.customer.birthDate,
                incomeValue: cart.customer.incomeValue,
              },
            },
            cart: {
              connect: {
                id: cart.id,
              },
            },
            seller: {
              connect: {
                id: cart.seller.id,
              },
            },
            orderStatus: {
              connect: {
                id: orderStatus.id,
              },
            },
            orderHistories: {
              create: {
                code: ORDER_STATUS_ENUM.AWAIT_CALLBACK,
                customerId: cart.customer.id,
                orderStatusId: orderStatus.id,
              },
            },
            orderTotal: {
              create: {
                discount: cart.cartTotal.discount,
                discountManual: cart.cartTotal.discountManual,
                shipping: cart.cartTotal.shipping,
                subtotal: cart.cartTotal.subtotal,
                total: cart.cartTotal.total,
              },
            },
            orderCoupons: {
              createMany: {
                data: cart.cartCoupons.map((cartCoupon) => ({
                  code: cartCoupon.code,
                  couponId: cartCoupon.couponId,
                  discount: cartCoupon.discount,
                  shipping: cartCoupon.shipping,
                })),
              },
            },
            orderItems: {
              createMany: {
                data: cart.cartItems.map((cartItem) => {
                  const item: any = {};

                  if (cartItem.raffleId) item.raffleId = cartItem.raffleId;
                  if (cartItem.planId) item.planId = cartItem.planId;

                  return {
                    ...item,
                    price: cartItem.price,
                    quantity: cartItem.quantity,
                    tax: cartItem.tax,
                    total: cartItem.total,
                  };
                }),
              },
            },
          },
          include: {
            ...orderQueryWithRelations,
          },
        });

        await this.emailQueue.add(
          JOBS_ENUM.SEND_EMAIL_JOB,
          {
            to: cart.customer.email,
            template: './order/order-created.hbs',
            subject: 'Pedido recebido',
            context: {
              name: cart.customer.name,
              raffles: order.orderItems.map((item) => ({
                name: item?.raffle?.title ? item.raffle.title : item.plan.title,
                quantity: item.quantity,
                total: item.total,
              })),
              total: order.orderTotal.total,
            },
          },
          {
            attempts: 3,
            removeOnFail: true,
            removeOnComplete: true,
          },
        );

        return order;
      },
      {
        maxWait: 20000, // default: 2000
        timeout: 100000, // default: 5000
      },
    );
  }

  async asaasPostback(data: AsaasEventDto) {
    const query = {};

    const orderStatus = await this.orderStatusService.findByCode(data.event);

    const order = await this.findByExternalReference(
      data.payment.externalReference,
    );

    return this.prismaService.$transaction(
      async (tx) => {
        const orderAlreadyUpdated = await tx.orderHistory.findFirst({
          where: {
            orderId: order.id,
            orderStatusId: orderStatus.id,
          },
        });

        if (orderAlreadyUpdated) return;

        if (order?.orderPayment?.orderCreditCard)
          query['orderPayment'] = {
            update: {
              data: {
                status: data?.payment?.status,
                gatewayPaymentId: data.payment.id,
                receiptUrl: data.payment.transactionReceiptUrl,
                orderCreditCard: {
                  update: {
                    data: {
                      token: data.payment.creditCard.creditCardToken,
                    },
                  },
                },
              },
            },
          };

        await this.emailQueue.add(
          JOBS_ENUM.SEND_EMAIL_JOB,
          {
            to: order.orderCustomer.email,
            subject: orderStatus.name,
            template: './payment/payment-status-change.hbs',
            context: {
              orderId: order.id,
              name: order.orderCustomer.name,
              status: orderStatus.name,
            },
          },
          {
            attempts: 3,
            removeOnFail: true,
            removeOnComplete: true,
          },
        );

        if (data.event === ORDER_STATUS_ENUM.PAYMENT_CONFIRMED) {
          await Promise.all(
            order.orderItems.map(async (orderItem) => {
              if (orderItem.raffleId) {
                const data = {
                  progressPercentage:
                    ((orderItem.raffle.payeds + orderItem.quantity) /
                      orderItem.raffle.totalNumbers) *
                    100,
                  payeds: {
                    increment: orderItem.quantity,
                  },
                };

                await tx.raffle.update({
                  where: { id: orderItem.raffleId },
                  data: { ...data, isFinished: data.progressPercentage >= 100 },
                });

                await this.quotasQueue.add(
                  JOBS_ENUM.CREATE_MANY_QUOTAS_JOB,
                  {
                    raffle: orderItem.raffle,
                    dto: {
                      raffleId: orderItem.raffle.id,
                      customerId: order.orderCustomer.customerId,
                      quantity: orderItem.quantity,
                    },
                  },
                  {
                    attempts: 3,
                    removeOnFail: true,
                    removeOnComplete: true,
                  },
                );
              }

              if (orderItem.planId) {
                await this.userRoleQueue.add(
                  JOBS_ENUM.ASSIGN_USER_ROLE_PLAN,
                  {
                    plans: order.orderItems.map((item) => {
                      return item.plan;
                    }),
                    address: order.orderPayment.address,
                    orderCustomer: order.orderCustomer,
                  },
                  {
                    attempts: 3,
                    removeOnFail: true,
                    removeOnComplete: true,
                  },
                );
              }
            }),
          );

          query['finance'] = {
            create: {
              sellerId: order.seller.id,
              customerId: order.orderCustomer.customerId,
              financeTotal: {
                create: {
                  subtotal: order.orderTotal.subtotal,
                  discount: order.orderTotal.discount,
                  discountManual: order.orderTotal.discountManual,
                  shipping: order.orderTotal.shipping,
                  total: order.orderTotal.total,
                },
              },
            },
          };
        }

        return tx.order.update({
          where: {
            id: order.id,
          },
          data: {
            orderStatus: {
              connect: {
                id: orderStatus.id,
              },
            },
            orderHistories: {
              create: {
                code: data.event,
                customerId: order.orderCustomer.customerId,
                orderStatusId: orderStatus.id,
              },
            },
            orderPayment: {
              update: {
                data: {
                  status: data.payment.status,
                  gatewayPaymentId: data.payment.id,
                  receiptUrl: data.payment.transactionReceiptUrl,
                },
              },
            },
            gatewayEvents: {
              create: {
                postback: {
                  toJSON() {
                    return data;
                  },
                },
                paymentMethodId: order.orderPayment.paymentMethodId,
                gatewayId: order.orderPayment.paymentMethod.gatewayId,
              },
            },
            ...query,
          },
        });
      },
      {
        maxWait: 20000, // default: 2000
        timeout: 100000, // default: 5000
      },
    );
  }

  async findByExternalReference(
    externalReference: string,
  ): Promise<OrderWithRelationsEntity> {
    const order =
      await this.orderRepository.findByExternalReference(externalReference);

    if (!order)
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);

    return order;
  }

  async findById(id: string): Promise<OrderWithRelationsEntity> {
    const order = await this.orderRepository.findById(id);

    if (!order)
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);

    return order;
  }

  async findAll(
    queryParams: SearchOrderDto,
  ): Promise<FindAllResultEntity<OrderWithRelationsEntity>> {
    const { sellerId, customer, orderStatusId } = queryParams;

    const queryParamsStringfy = JSON.stringify(queryParams);

    if (queryParams.cache) {
      const cache =
        await this.cacheManager.get<FindAllResultEntity<OrderWithRelationsEntity> | null>(
          `orders_${queryParamsStringfy}`,
        );

      if (cache) return cache;
    }

    const query = new QueryBuilder(queryParams)
      .where({
        sellerId: sellerId && sellerId,
        orderCustomer: customer && {
          customer: { name: { contains: customer } },
        },
        orderStatusId: orderStatusId && orderStatusId,
      })
      .date('createdAt')
      .sort()
      .date('createdAt')
      .pagination()
      .handle();

    const orders = await this.orderRepository.findAll(query);
    const total = await this.orderRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    if (queryParams.cache)
      await this.cacheManager.set(`orders_${queryParamsStringfy}`, {
        data: orders,
        info,
      });

    return { data: orders, info };
  }
}
