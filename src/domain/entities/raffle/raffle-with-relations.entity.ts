import { ApiProperty } from '@nestjs/swagger';
import { RaffleCategoryWithRelationsEntity } from '../raffle-category';
import { RaffleEntity } from './raffle.entity';
import { WinnerEntity } from '../winner';
import { AwardEntity } from '../award';

export class RaffleWithRelationsEntity extends RaffleEntity {
  @ApiProperty({ type: [RaffleCategoryWithRelationsEntity] })
  raffleCategories: RaffleCategoryWithRelationsEntity[];

  @ApiProperty({ type: [WinnerEntity] })
  winners: WinnerEntity[];

  @ApiProperty({ type: [AwardEntity] })
  awards: AwardEntity[];
}

export const raffleQueryWithRelations = {
  raffleCategories: {
    include: { category: true },
  },
  winners: true,
  awards: true,
};
