import { ApiProperty } from '@nestjs/swagger';
import { PlanCycleEntity } from '../plan-cycle';
import { PlanEntity } from './plan.entity';
import { RolePlanEntity } from '../role-plan';

export class PlanWithRelationsEntity extends PlanEntity {
  @ApiProperty({ type: PlanCycleEntity })
  planCycle: PlanCycleEntity;

  @ApiProperty({ type: RolePlanEntity })
  rolePlans: RolePlanEntity[];
}
