import { CartCoupon } from '@prisma/client';

export class CartCouponEntity implements CartCoupon {
  id: string;
  couponId: string;
  cartId: string;
  code: string;
  discount: number;
  shipping: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
