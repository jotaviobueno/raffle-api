import { Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { StateEntity } from 'src/domain/entities';
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

  async findAll(queryParams: QueryParamsDto): Promise<StateEntity[]> {
    const cache = await this.cacheManager.get<StateEntity[] | null>('states');

    if (cache) return cache;

    const query = new QueryBuilder(queryParams).pagination().handle();

    const states = await this.stateRepository.findAll(query);

    await this.cacheManager.set('states', states);

    return states;
  }

  async findAllCountryId({
    countryId,
    ...dto
  }: QueryParamsDto & { countryId: string }): Promise<StateEntity[]> {
    const cache = await this.cacheManager.get<StateEntity[] | null>(
      `states_${countryId}`,
    );

    if (cache) return cache;

    const query = new QueryBuilder(dto)
      .where({ countryId })
      .pagination()
      .handle();

    const states = await this.stateRepository.findAll(query);

    await this.cacheManager.set(`states_${countryId}`, states);

    return states;
  }
}
