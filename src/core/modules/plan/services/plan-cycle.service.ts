import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreatePlanCycleDto,
  QueryParamsDto,
  UpdatePlanCycleDto,
} from 'src/domain/dtos';
import { FindAllResultEntity, PlanCycleEntity } from 'src/domain/entities';
import { PlanCycleRepository } from '../repositories/plan-cycle.repository';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class PlanCycleService
  implements
    ServiceBase<PlanCycleEntity, CreatePlanCycleDto, UpdatePlanCycleDto>
{
  constructor(
    private readonly planCycleRepository: PlanCycleRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreatePlanCycleDto): Promise<PlanCycleEntity> {
    const playCycle = await this.planCycleRepository.create(dto);

    return playCycle;
  }

  async findById(id: string): Promise<PlanCycleEntity> {
    const planCycle = await this.planCycleRepository.findById(id);

    if (!planCycle)
      throw new HttpException('Plan cycle not found', HttpStatus.NOT_FOUND);

    return planCycle;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<FindAllResultEntity<PlanCycleEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    if (queryParams.cache) {
      const cache =
        await this.cacheManager.get<FindAllResultEntity<PlanCycleEntity> | null>(
          `plan_cycles_${queryParamsStringfy}`,
        );

      if (cache) return cache;
    }

    const query = new QueryBuilder(queryParams)
      .where({
        deletedAt: null,
      })
      .sort()
      .date('createdAt')
      .pagination()
      .handle();

    const planCycles = await this.planCycleRepository.findAll(query);
    const total = await this.planCycleRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    if (queryParams.cache)
      await this.cacheManager.set(`plan_cycles_${queryParamsStringfy}`, {
        data: planCycles,
        info,
      });

    return { data: planCycles, info };
  }

  async update(dto: UpdatePlanCycleDto): Promise<PlanCycleEntity> {
    const planCycle = await this.findById(dto.id);

    const update = await this.planCycleRepository.update({
      ...dto,
      id: planCycle.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const planCycle = await this.findById(id);

    const remove = await this.planCycleRepository.softDelete(planCycle.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
