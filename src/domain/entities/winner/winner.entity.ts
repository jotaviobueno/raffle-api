import { ApiProperty } from '@nestjs/swagger';
import { Winner } from '@prisma/client';

export class WinnerEntity implements Winner {
  @ApiProperty()
  id: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  raffleId: string;

  @ApiProperty()
  number: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
