import { CartPayment } from '@prisma/client';
import { CartCouponEntity } from '../cart-coupon';
import { CartItemEntity } from '../cart-item';
import { CartTotalEntity } from '../cart-total';
import { UserEntity } from '../user';
import { AddressEntity } from '../address';
import { PaymentMethodEntity } from '../payment-method';
import { SellerEntity } from '../seller';

export class CartWithRelationsEntity {
  id: string;
  customerId: string;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  cartTotal?: CartTotalEntity;
  cartItems: CartItemEntity[];
  cartCoupons: CartCouponEntity[];
  cartPayment?: CartPayment & {
    address: AddressEntity;
    paymentMethod: PaymentMethodEntity;
  };
  seller: SellerEntity;
  customer: Pick<
    UserEntity,
    | 'id'
    | 'firstName'
    | 'lastName'
    | 'phone'
    | 'document'
    | 'email'
    | 'createdAt'
    | 'updatedAt'
    | 'deletedAt'
    | 'avatar'
  >;
}
