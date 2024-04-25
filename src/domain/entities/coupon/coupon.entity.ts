import { Coupon } from '@prisma/client';

export class CouponEntity implements Coupon {
  id: string;
  name: string;
  code: string;
  discount: number;
  shipping: number;
  usages: number;
  maxUsages: number;
  maxUsagesPerUser: number;
  utmCampaignId: string;
  isActive: boolean;
  from: Date | null;
  to: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
