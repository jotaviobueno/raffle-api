import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreatePlanDto, QueryParamsDto, UpdatePlanDto } from 'src/domain/dtos';
import {
  FindAllResultEntity,
  PlanEntity,
  PlanWithRelationsEntity,
} from 'src/domain/entities';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { PlanRepository } from '../repositories/plan.repository';
import { PlanCycleService } from './plan-cycle.service';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class PlanService
  implements ServiceBase<PlanEntity, CreatePlanDto, UpdatePlanDto>
{
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly planCycleService: PlanCycleService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreatePlanDto): Promise<PlanEntity> {
    const planCycle = await this.planCycleService.findById(dto.planCycleId);

    const plan = await this.planRepository.create({
      ...dto,
      planCycleId: planCycle.id,
    });

    return plan;
  }

  async findById(id: string): Promise<PlanWithRelationsEntity> {
    const plan = await this.planRepository.findById(id);

    if (!plan) throw new HttpException('Plan not found', HttpStatus.NOT_FOUND);

    return plan;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<FindAllResultEntity<PlanWithRelationsEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    if (queryParams.cache) {
      const cache =
        await this.cacheManager.get<FindAllResultEntity<PlanWithRelationsEntity> | null>(
          `plans_${queryParamsStringfy}`,
        );

      if (cache) return cache;
    }

    const query = new QueryBuilder(queryParams)
      .sort()
      .date('createdAt')
      .pagination()
      .handle();

    const plans = await this.planRepository.findAll(query);
    const total = await this.planRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    if (queryParams.cache)
      await this.cacheManager.set(`plans_${queryParamsStringfy}`, {
        data: plans,
        info,
      });

    return { data: plans, info };
  }

  async update(dto: UpdatePlanDto): Promise<PlanEntity> {
    const plan = await this.findById(dto.id);

    const update = await this.planRepository.update({
      ...dto,
      id: plan.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const plan = await this.findById(id);

    const remove = await this.planRepository.softDelete(plan.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
