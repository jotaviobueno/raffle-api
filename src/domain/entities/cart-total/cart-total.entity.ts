import { ApiProperty } from '@nestjs/swagger';
import { CartTotal } from '@prisma/client';

export class CartTotalEntity implements CartTotal {
  @ApiProperty()
  id: string;
  @ApiProperty({ type: Number })
  subtotal: number;

  @ApiProperty({ type: Number })
  discount: number;

  @ApiProperty({ type: Number })
  discountManual: number;

  @ApiProperty({ type: Number })
  shipping: number;

  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: Number })
  fee: number;

  @ApiProperty()
  cartId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
