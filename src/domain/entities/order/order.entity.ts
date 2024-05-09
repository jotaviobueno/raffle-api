import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@prisma/client';

export class OrderEntity implements Order {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sellerId: string;

  @ApiProperty({ type: Number, nullable: true })
  invoiceNumber: number | null;

  @ApiProperty({ nullable: true })
  comment: string | null;

  @ApiProperty({ nullable: true })
  ip: string | null;

  @ApiProperty({ nullable: true })
  userAgent: string | null;

  @ApiProperty()
  cartId: string;

  @ApiProperty({ type: Date, nullable: true })
  dueDate: Date | null;

  @ApiProperty({ nullable: true })
  orderStatusId: string | null;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
