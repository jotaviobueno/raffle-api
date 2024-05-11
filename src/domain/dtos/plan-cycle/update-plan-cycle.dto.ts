import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanCycleDto } from './create-plan-cycle.dto';

export class UpdatePlanCycleDto extends PartialType(CreatePlanCycleDto) {
  id: string;
}
