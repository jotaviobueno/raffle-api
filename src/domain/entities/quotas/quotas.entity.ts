import { ApiProperty } from '@nestjs/swagger';
import { Quotas } from '@prisma/client';

export class QutoasEntity implements Quotas {
  @ApiProperty()
  id: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  raffleId: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
