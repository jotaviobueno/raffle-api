import { ApiProperty } from '@nestjs/swagger';
import { OrderCustomer } from '@prisma/client';

export class OrderCustomerEntity implements OrderCustomer {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  document: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
