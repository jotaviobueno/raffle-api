import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreatePlanCycleDto, UpdatePlanCycleDto } from 'src/domain/dtos';
import { PlanCycleEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class PlanCycleRepository extends RepositoryFactory<
  PlanCycleEntity,
  CreatePlanCycleDto,
  UpdatePlanCycleDto
> {
  constructor() {
    super('planCycle');
  }

  findById(id: string): Promise<PlanCycleEntity | null> {
    return this.prismaService.planCycle.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll(query: QueryBuilderEntity): Promise<PlanCycleEntity[]> {
    return this.prismaService.planCycle.findMany(query);
  }
}
