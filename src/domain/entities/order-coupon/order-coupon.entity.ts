import { OrderCoupon } from '@prisma/client';

export class OrderCouponEntity implements OrderCoupon {
  id: string;
  orderId: string;
  couponId: string;
  code: string;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
