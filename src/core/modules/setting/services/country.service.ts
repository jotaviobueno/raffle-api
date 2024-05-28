import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { QueryBuilder } from 'src/common/utils';
import { QueryParamsDto } from 'src/domain/dtos';
import { CountryEntity, FindAllResultEntity } from 'src/domain/entities';
import { CountryRepository } from '../repositories/country.repository';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { StateService } from './state.service';

@Injectable()
export class CountryService implements ServiceBase<CountryEntity> {
  constructor(
    private readonly countryRepository: CountryRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly stateService: StateService,
  ) {}

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<FindAllResultEntity<CountryEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<CountryEntity> | null>(
        `countries_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .sort()
      .date('createdAt')
      .pagination()
      .handle();

    const countries = await this.countryRepository.findAll(query);
    const total = await this.countryRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`countries_${queryParamsStringfy}`, {
      data: countries,
      info,
    });

    return { data: countries, info };
  }

  async findById(id: string): Promise<CountryEntity> {
    const country = await this.countryRepository.findById(id);

    if (!country)
      throw new HttpException('country not found', HttpStatus.NOT_FOUND);

    return country;
  }

  async findAllCountryId({
    countryId,
    ...dto
  }: QueryParamsDto & { countryId: string }) {
    const country = await this.findById(countryId);

    const states = await this.stateService.findAllCountryId({
      countryId: country.id,
      ...dto,
    });

    return states;
  }
}
