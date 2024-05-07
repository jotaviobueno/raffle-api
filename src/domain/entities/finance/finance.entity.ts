import { ApiProperty } from '@nestjs/swagger';
import { Finance } from '@prisma/client';

export class FinanceEntity implements Finance {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  sellerId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
