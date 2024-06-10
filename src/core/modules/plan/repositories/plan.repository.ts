import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreatePlanDto, UpdatePlanDto } from 'src/domain/dtos';
import {
  PlanEntity,
  PlanWithRelationsEntity,
  QueryBuilderEntity,
} from 'src/domain/entities';

@Injectable()
export class PlanRepository extends RepositoryFactory<
  PlanEntity,
  CreatePlanDto,
  UpdatePlanDto
> {
  constructor() {
    super('plan');
  }

  findById(id: string): Promise<PlanWithRelationsEntity | null> {
    return this.prismaService.plan.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        planCycle: true,
        rolePlans: true,
      },
    });
  }

  findAll(query: QueryBuilderEntity): Promise<PlanWithRelationsEntity[]> {
    return this.prismaService.plan.findMany({
      ...query,
      include: {
        planCycle: true,
        rolePlans: {
          include: { role: true },
        },
      },
    });
  }
}
