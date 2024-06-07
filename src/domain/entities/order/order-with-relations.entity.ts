import { OrderCouponWithRelationsEntity } from '../order-coupon';
import { OrderHistoryWithRelationsEntity } from '../order-history';
import { OrderItemWithRelationsEntity } from '../order-item';
import { OrderStatusEntity } from '../order-status';
import { OrderTotalEntity } from '../order-total';
import { SellerEntity } from '../seller';
import { OrderEntity } from './order.entity';
import { ApiProperty } from '@nestjs/swagger';
import { OrderPaymentWithRelations } from '../order-payment';
import { OrderCustomerEntity } from '../order-customer';
import { OrderTypeEntity } from '../order-type';

export class OrderWithRelationsEntity extends OrderEntity {
  @ApiProperty({ type: SellerEntity })
  seller: SellerEntity;

  @ApiProperty({ type: OrderCustomerEntity })
  orderCustomer: OrderCustomerEntity;

  @ApiProperty({ type: OrderPaymentWithRelations, nullable: true })
  orderPayment?: OrderPaymentWithRelations;

  @ApiProperty({ type: OrderTotalEntity, nullable: true })
  orderTotal?: OrderTotalEntity;

  @ApiProperty({ type: [OrderCouponWithRelationsEntity] })
  orderCoupons: OrderCouponWithRelationsEntity[];

  @ApiProperty({ type: OrderTypeEntity })
  orderType: OrderTypeEntity;

  @ApiProperty({ type: [OrderItemWithRelationsEntity] })
  orderItems: OrderItemWithRelationsEntity[];

  @ApiProperty({ type: [OrderHistoryWithRelationsEntity] })
  orderHistories: OrderHistoryWithRelationsEntity[];

  @ApiProperty({ type: OrderStatusEntity, nullable: true })
  orderStatus?: OrderStatusEntity;
}

export const orderQueryWithRelations = {
  orderPayment: {
    include: {
      address: {
        include: {
          state: true,
        },
      },
      orderBankSlip: true,
      orderCreditCard: true,
      orderPix: true,
      paymentMethod: {
        include: {
          gateway: true,
        },
      },
    },
  },
  orderCustomer: true,
  orderType: true,
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
