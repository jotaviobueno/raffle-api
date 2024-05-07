import { ApiProperty } from '@nestjs/swagger';
import { CustomerSeller } from '@prisma/client';

export class CustomerSellerEntity implements CustomerSeller {
  @ApiProperty()
  id: string;

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
