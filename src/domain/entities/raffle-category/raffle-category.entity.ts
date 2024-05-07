import { ApiProperty } from '@nestjs/swagger';
import { RaffleCategory } from '@prisma/client';

export class RaffleCategoryEntity implements RaffleCategory {
  @ApiProperty()
  id: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  raffleId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
