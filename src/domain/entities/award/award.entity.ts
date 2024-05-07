import { ApiProperty } from '@nestjs/swagger';
import { Award } from '@prisma/client';

export class AwardEntity implements Award {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sellerId: string;

  @ApiProperty()
  raffleId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
