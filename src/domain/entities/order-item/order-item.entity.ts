import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from '@prisma/client';

export class OrderItemEntity implements OrderItem {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: Number })
  quantity: number;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: Number })
  tax: number;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  raffleId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
