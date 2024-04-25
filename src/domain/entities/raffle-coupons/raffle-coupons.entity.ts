import { RaffleCoupon } from '@prisma/client';

export class RaffleCouponsEntity implements RaffleCoupon {
  id: string;
  raffleId: string;
  couponId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
