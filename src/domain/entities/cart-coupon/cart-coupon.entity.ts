import { ApiProperty } from '@nestjs/swagger';
import { CartCoupon } from '@prisma/client';

export class CartCouponEntity implements CartCoupon {
  @ApiProperty()
  id: string;

  @ApiProperty()
  couponId: string;

  @ApiProperty()
  cartId: string;

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
