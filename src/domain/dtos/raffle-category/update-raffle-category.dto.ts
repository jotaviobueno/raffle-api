import { PartialType } from '@nestjs/mapped-types';
import { CreateRaffleCategoryDto } from './create-raffle-category.dto';

export class UpdateRaffleCategoryDto extends PartialType(
  CreateRaffleCategoryDto,
) {
  id: string;
}
