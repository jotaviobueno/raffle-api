import { Module } from '@nestjs/common';
import { PlanService } from './services/plan.service';
import { PlanCycleService } from './services/plan-cycle.service';
import { PlanRepository } from './repositories/plan.repository';
import { PlanController } from './controllers/plan.controller';
import { PlanCycleController } from './controllers/plan-cycle.controller';
import { PlanCycleRepository } from './repositories/plan-cycle.repository';

@Module({
  controllers: [PlanController, PlanCycleController],
  providers: [
    PlanService,
    PlanRepository,
    PlanCycleService,
    PlanCycleRepository,
  ],
  exports: [PlanService, PlanCycleService],
})
export class PlanModule {}
