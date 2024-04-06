import { PartialType } from '@nestjs/swagger';
import { CreateRaffleCategoryDto } from './create-raffle-category.dto';

export class UpdateRaffleCategoryDto extends PartialType(
  CreateRaffleCategoryDto,
) {
  id: string;
}
