import { AddressEntity } from '../address';
import { OrderBankSlipEntity } from '../order-bank-slip';
import { OrderCouponEntity } from '../order-coupon';
import { OrderCreditCardEntity } from '../order-credit-card';
import { OrderHistoryEntity } from '../order-history';
import { OrderItemEntity } from '../order-item';
import { OrderStatusEntity } from '../order-status';
import { OrderTotalEntity } from '../order-total';
import { PaymentMethodEntity } from '../payment-method';
import { OrderPixEntity } from '../order-pix';
import { SellerEntity } from '../seller';
import { UserEntity } from '../user';
import { CouponEntity } from '../coupon';
import { RaffleEntity } from '../raffle';

export class OrderWithRelationsEntity {
  id: string;
  sellerId: string;
  customerId: string;
  invoiceNumber: number | null;
  comment: string | null;
  ip: string | null;
  userAgent: string | null;
  dueDate: Date | null;
  orderStatusId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  //
  seller: SellerEntity;
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
  orderPayment?: {
    paymentMethod: PaymentMethodEntity;
    address: AddressEntity;
    orderBankSlip?: OrderBankSlipEntity;
    orderCreditCard?: OrderCreditCardEntity;
    orderPix?: OrderPixEntity;
  };
  orderTotal?: OrderTotalEntity;
  orderCoupons?: (OrderCouponEntity & { coupon: CouponEntity })[];
  orderItems: (OrderItemEntity & { raffle: RaffleEntity })[];
  orderHistories: (OrderHistoryEntity & { orderStatus: OrderStatusEntity })[];
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
