import { ApiProperty } from '@nestjs/swagger';
import { OrderTotal } from '@prisma/client';

export class OrderTotalEntity implements OrderTotal {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty({ type: Number })
  tax: number;

  @ApiProperty({ type: Number })
  subtotal: number;

  @ApiProperty({ type: Number })
  discount: number;

  @ApiProperty({ type: Number })
  discountManual: number;

  @ApiProperty({ type: Number })
  shipping: number;

  @ApiProperty({ type: Number })
  fee: number;

  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
