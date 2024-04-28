import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from '@prisma/client';

export class CartItemEntity implements CartItem {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: Number })
  quantity: number;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty()
  cartId: string;

  @ApiProperty({ type: Number })
  tax: number;

  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty()
  raffleId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
