import { ApiProperty } from '@nestjs/swagger';
import { OrderHistory } from '@prisma/client';

export class OrderHistoryEntity implements OrderHistory {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  orderStatusId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
