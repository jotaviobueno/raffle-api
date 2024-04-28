import { ApiProperty } from '@nestjs/swagger';
import { Coupon } from '@prisma/client';

export class CouponEntity implements Coupon {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  @ApiProperty({ type: Number })
  discount: number;

  @ApiProperty({ type: Number })
  shipping: number;

  @ApiProperty({ type: Number })
  usages: number;

  @ApiProperty({ type: Number })
  maxUsages: number;

  @ApiProperty({ type: Number })
  maxUsagesPerUser: number;

  @ApiProperty()
  utmCampaignId: string;

  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @ApiProperty({ type: Date, nullable: true })
  from: Date | null;

  @ApiProperty({ type: Date, nullable: true })
  to: Date | null;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
