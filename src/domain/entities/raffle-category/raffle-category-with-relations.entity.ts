import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from '../category';
import { RaffleCategoryEntity } from './raffle-category.entity';

export class RaffleCategoryWithRelationsEntity extends RaffleCategoryEntity {
  @ApiProperty({ type: CategoryEntity })
  category: CategoryEntity;
}
