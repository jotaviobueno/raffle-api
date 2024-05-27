import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  AsaasWebhookEventDto,
  CreateCheckoutDto,
  JobQuotasDto,
  SearchOrderDto,
  SendEmailDto,
} from 'src/domain/dtos';
import {
  FindAllResultEntity,
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
                  invoiceUrl: response.payment.invoiceUrl,
                  orderPix: {
                    create: {
                      copyPaste: response.data.payload,
                      image: response.data.encodedImage,
                      expiratAt: new Date(response.data.expirationDate),
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
                  status: response.payment.status,
                  method: cart.cartPayment.method,
                  invoiceUrl: response.payment.invoiceUrl,
                  paymentMethodId: cart.cartPayment.paymentMethodId,
                  orderCreditCard: {
                    create: {
                      number: prettyCardNumber(dto.number),
                      brand: creditCardType(dto.number)[0].niceType,
                      cvv: dto.cvv,
                      name: dto.holder,
                      expirationMonth: dto.expirationMonth,
                      token: response.payment.creditCardToken,
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
                  invoiceUrl: response.payment.invoiceUrl,
                  orderBankSlip: {
                    create: {
                      bankSlipUrl: response.payment.bankSlipUrl,
                      ourNumber: response.payment.nossoNumero,
                      expirationAt: new Date(response.payment.dueDate),
                      identificationField: response?.data?.identificationField,
                      barCode: response.data.barCode,
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
            invoiceNumber: +response.payment.invoiceNumber,
            dueDate: new Date(),
            ip: dto.ip,
            userAgent: dto.userAgent,
            orderCustomer: {
              create: {
                document: cart.customer.document,
                email: cart.customer.email,
                fullName: cart.customer.fullName,
                mobilePhone: cart.customer.mobilePhone,
                phone: cart.customer.phone,
                customer: {
                  connect: {
                    id: cart.customer.id,
                  },
                },
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
                fee: cart.cartTotal.fee,
                tax: cart.cartTotal.tax,
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
                data: cart.cartItems.map((cartItem) => ({
                  price: cartItem.price,
                  quantity: cartItem.quantity,
                  raffleId: cartItem.raffleId,
                  tax: cartItem.tax,
                  total: cartItem.total,
                })),
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
              fullName: cart.customer.fullName,
              raffles: order.orderItems.map((item) => ({
                name: item.raffle.title,
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

  async asaasPostback(data: AsaasWebhookEventDto) {
    const query = {};

    const order = await this.findByInvoiceNumber(+data.payment.invoiceNumber);

    const orderStatus = await this.orderStatusService.findByCode(data.event);

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
                gatewayPamentId: data.payment.id,
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
              fullName: order.orderCustomer.fullName,
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
                  fee: order.orderTotal.fee,
                  tax: order.orderTotal.tax,
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
                  gatewayPamentId: data.payment.id,
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

  async findByInvoiceNumber(
    invoiceNumber: number,
  ): Promise<OrderWithRelationsEntity> {
    const order = await this.orderRepository.findByInvoiceNumber(invoiceNumber);

    if (!order)
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);

    return order;
  }

  async findById(id: string): Promise<OrderWithRelationsEntity> {
    const cache = await this.cacheManager.get<OrderWithRelationsEntity | null>(
      `order_${id}`,
    );

    if (cache) return cache;

    const order = await this.orderRepository.findById(id);

    if (!order)
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);

    await this.cacheManager.set(`order_${id}`, order);

    return order;
  }

  async findAll(
    queryParams: SearchOrderDto,
  ): Promise<FindAllResultEntity<OrderWithRelationsEntity>> {
    const { sellerId } = queryParams;

    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<OrderWithRelationsEntity> | null>(
        `orders_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .where({
        sellerId: sellerId,
      })
      .date('createdAt')
      .sort()
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

    await this.cacheManager.set(`orders_${queryParamsStringfy}`, {
      data: orders,
      info,
    });

    return { data: orders, info };
  }
}
