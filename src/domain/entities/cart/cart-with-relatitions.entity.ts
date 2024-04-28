import { CartCouponEntity } from '../cart-coupon';
import { CartItemEntity } from '../cart-item';
import { CartTotalEntity } from '../cart-total';
import { UserEntity } from '../user';
import { SellerEntity } from '../seller';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { CartEntity } from './cart.entity';
import { CartPaymentWithRelationsEntity } from '../cart-payment';

export class CartWithRelationsEntity extends CartEntity {
  @ApiProperty({
    type: PickType(UserEntity, [
      'id',
      'firstName',
      'asaasCustomerId',
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
    | 'asaasCustomerId'
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

  @ApiProperty({ type: CartTotalEntity, nullable: true })
  cartTotal?: CartTotalEntity;

  @ApiProperty({ type: [CartItemEntity] })
  cartItems: CartItemEntity[];

  @ApiProperty({ type: [CartCouponEntity] })
  cartCoupons: CartCouponEntity[];

  @ApiProperty({ type: CartPaymentWithRelationsEntity, nullable: true })
  cartPayment?: CartPaymentWithRelationsEntity;

  @ApiProperty({ type: SellerEntity })
  seller: SellerEntity;
}

export const cartQueryWithRelations = {
  cartTotal: {
    where: {
      deletedAt: null,
    },
  },
  cartItems: {
    where: {
      deletedAt: null,
    },
  },
  cartCoupons: {
    where: {
      deletedAt: null,
    },
  },
  cartPayment: {
    include: {
      address: true,
      paymentMethod: true,
    },
  },
  seller: true,
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
};
