import { AddressEntity } from '../address';
import { OrderBankSlipEntity } from '../order-bank-slip';
import { OrderCouponEntity } from '../order-coupon';
import { OrderCreditCardEntity } from '../order-credit-card';
import { OrderHistoryEntity } from '../order-history';
import { OrderItemEntity } from '../order-item';
import { OrderPaymentEntity } from '../order-payment';
import { OrderStatusEntity } from '../order-status';
import { OrderTotalEntity } from '../order-total';
import { PaymentMethodEntity } from '../payment-method';
import { OrderPixEntity } from '../order-pix';
import { SellerEntity } from '../seller';
import { UserEntity } from '../user';

export class OrderWithRelationsEntity {
  id: string;
  sellerId: string;
  customerId: string;
  invoiceNumber: number;
  invoicePrefix: string;
  comment: string | null;
  ip: string;
  userAgent: string;
  orderStatusId: string;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  seller: SellerEntity;
  customer: UserEntity;
  orderPayment?: OrderPaymentEntity & {
    orderBankSlip: OrderBankSlipEntity;
    orderCreditCard: OrderCreditCardEntity;
    paymentMethod: PaymentMethodEntity;
    address: AddressEntity;
    orderPix: OrderPixEntity;
  };
  orderTotal?: OrderTotalEntity;
  orderCoupon?: OrderCouponEntity;
  orderItems: OrderItemEntity[];
  orderHistories: OrderHistoryEntity[];
  orderStatus: OrderStatusEntity;
}
