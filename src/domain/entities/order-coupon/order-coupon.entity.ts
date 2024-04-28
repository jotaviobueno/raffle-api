import { ApiProperty } from '@nestjs/swagger';
import { OrderCoupon } from '@prisma/client';

export class OrderCouponEntity implements OrderCoupon {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  couponId: string;

  @ApiProperty()
  code: string;

  @ApiProperty({ type: Number })
  discount: number;

  @ApiProperty({ type: Number })
  shipping: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
