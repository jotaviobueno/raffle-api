import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  AsaasWebhookEventDto,
  CreateCheckoutDto,
  QueryParamsDto,
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
import {
  QueryBuilder,
  prettyCardNumber,
  randomNumberWithRangeUtil,
} from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import * as creditCardType from 'credit-card-type';

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
  ) {}

  async create(dto: CreateCheckoutDto): Promise<OrderWithRelationsEntity> {
    const cart = await this.cartService.findById(dto.cartId);

    return this.prismaService.$transaction(
      async (tx) => {
        let query = {};

        const response = await this.paymentService.process({ dto, cart });

        switch (cart.cartPayment.paymentMethod.code) {
          case 'pix':
            query = {
              customer: {
                update: {
                  asaasCustomerId: response.customer.id,
                },
              },
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
              customer: {
                update: {
                  asaasCustomerId: response.customer.id,
                },
              },
              orderPayment: {
                create: {
                  addressId: cart.cartPayment.addressId,
                  method: cart.cartPayment.method,
                  invoiceUrl: response.payment.invoiceUrl,
                  paymentMethodId: cart.cartPayment.paymentMethodId,
                  orderCreditCard: {
                    create: {
                      number: prettyCardNumber(dto.number),
                      brand: creditCardType(dto.number)[0].niceType,
                      status: response.payment.status,
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
              customer: {
                update: {
                  asaasCustomerId: response.customer.id,
                },
              },
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
            customer: { connect: { id: cart.customer.id } },
            seller: {
              connect: {
                id: cart.seller.id,
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

        return order;
      },
      {
        maxWait: 20000, // default: 2000
        timeout: 100000, // default: 5000
      },
    );
  }

  async asaasPostback(data: AsaasWebhookEventDto) {
    console.log(data);
    let query = {};

    const order = await this.findByInvoiceNumber(+data.payment.invoiceNumber);

    const orderStatus = await this.orderStatusService.findByName(data.event);

    return this.prismaService.$transaction(
      async (tx) => {
        const orderAlreadyUpdated = await tx.orderHistory.findFirst({
          where: {
            orderId: order.id,
            orderStatusId: orderStatus.id,
          },
        });

        if (orderAlreadyUpdated) return;

        if (order.orderPayment.orderCreditCard)
          query = {
            orderPayment: {
              update: {
                orderCreditCard: {
                  update: {
                    data: {
                      status: data.payment.status,
                      token: data.payment.creditCard.creditCardToken,
                    },
                  },
                },
              },
            },
          };

        if (data.event === 'PAYMENT_CONFIRMED') {
          const createQuotesDto = order.orderItems.flatMap((orderItem) => {
            return Array.from({ length: orderItem.quantity }).map(() => ({
              raffleId: orderItem.raffleId,
              number: randomNumberWithRangeUtil(
                orderItem.raffle.initial,
                orderItem.raffle.final,
              ),
              deletedAt: null,
            }));
          });

          query = {
            ...query,
            customer: {
              update: {
                quotas: {
                  createMany: {
                    data: createQuotesDto,
                    skipDuplicates: true,
                  },
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
                customerId: order.customer.id,
                orderStatusId: orderStatus.id,
              },
            },
            orderPayment: {
              update: {
                gatewayPamentId: data.payment.id,
                receiptUrl: data.payment.transactionReceiptUrl,
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
    const order = await this.orderRepository.findById(id);

    if (!order)
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);

    return order;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<FindAllResultEntity<OrderEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<OrderEntity> | null>(
        `orders_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams).sort().pagination().handle();

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
