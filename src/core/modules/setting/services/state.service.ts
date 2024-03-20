import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { FindAllResultEntity, StateEntity } from 'src/domain/entities';
import { StateRepository } from '../repositories/state.repository';
import { QueryParamsDto } from 'src/domain/dtos';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class StateService implements ServiceBase<StateEntity> {
  constructor(
    private readonly stateRepository: StateRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<FindAllResultEntity<StateEntity>> {
    const cache =
      await this.cacheManager.get<FindAllResultEntity<StateEntity> | null>(
        `states`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams).pagination().handle();

    const states = await this.stateRepository.findAll(query);
    const total = await this.stateRepository.count();

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`states`, { data: states, info });

    return { data: states, info };
  }

  async findById(id: string): Promise<StateEntity> {
    const state = await this.stateRepository.findById(id);

    if (!state)
      throw new HttpException('State not found', HttpStatus.NOT_FOUND);

    return state;
  }

  async findAllCountryId({
    countryId,
    ...queryParams
  }: QueryParamsDto & { countryId: string }): Promise<
    FindAllResultEntity<StateEntity>
  > {
    const cache =
      await this.cacheManager.get<FindAllResultEntity<StateEntity> | null>(
        `states_${countryId}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .where({ countryId })
      .pagination()
      .handle();

    const states = await this.stateRepository.findAll(query);
    const total = await this.stateRepository.count();

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`states_${countryId}`, { data: states, info });

    return { data: states, info };
  }
}
