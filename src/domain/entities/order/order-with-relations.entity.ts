import { OrderCouponWithRelationsEntity } from '../order-coupon';
import { OrderHistoryWithRelationsEntity } from '../order-history';
import { OrderItemWithRelationsEntity } from '../order-item';
import { OrderStatusEntity } from '../order-status';
import { OrderTotalEntity } from '../order-total';
import { SellerEntity } from '../seller';
import { UserEntity } from '../user';
import { OrderEntity } from './order.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { OrderPaymentWithRelations } from '../order-payment';

export class OrderWithRelationsEntity extends OrderEntity {
  @ApiProperty({ type: SellerEntity })
  seller: SellerEntity;

  @ApiProperty({
    type: PickType(UserEntity, [
      'id',
      'firstName',
      'lastName',
      'phone',
      'document',
      'email',
      'avatar',
      'asaasCustomerId',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ]),
  })
  customer: Pick<
    UserEntity,
    | 'id'
    | 'firstName'
    | 'lastName'
    | 'phone'
    | 'document'
    | 'email'
    | 'avatar'
    | 'asaasCustomerId'
    | 'createdAt'
    | 'updatedAt'
    | 'deletedAt'
  >;

  @ApiProperty({ type: OrderPaymentWithRelations, nullable: true })
  orderPayment?: OrderPaymentWithRelations;

  @ApiProperty({ type: OrderTotalEntity, nullable: true })
  orderTotal?: OrderTotalEntity;

  @ApiProperty({ type: [OrderCouponWithRelationsEntity] })
  orderCoupons: OrderCouponWithRelationsEntity[];

  @ApiProperty({ type: [OrderItemWithRelationsEntity] })
  orderItems: OrderItemWithRelationsEntity[];

  @ApiProperty({ type: [OrderHistoryWithRelationsEntity] })
  orderHistories: OrderHistoryWithRelationsEntity[];

  @ApiProperty({ type: OrderStatusEntity })
  orderStatus: OrderStatusEntity;
}

export const orderQueryWithRelations = {
  customer: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      document: true,
      asaasCustomerId: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      avatar: true,
    },
  },
  orderPayment: {
    include: {
      address: true,
      orderBankSlip: true,
      orderCreditCard: true,
      orderPix: true,
      paymentMethod: true,
    },
  },
  orderCoupons: {
    include: {
      coupon: true,
    },
  },
  orderHistories: {
    include: {
      orderStatus: true,
    },
  },
  orderItems: {
    include: {
      raffle: true,
    },
  },
  orderStatus: true,
  orderTotal: true,
  seller: true,
};
