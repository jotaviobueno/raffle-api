import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { QueryBuilder } from 'src/common/utils';
import { QueryParamsDto } from 'src/domain/dtos';
import { CountryEntity } from 'src/domain/entities';
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

  async findAll(queryParams: QueryParamsDto): Promise<CountryEntity[]> {
    const cache = await this.cacheManager.get<CountryEntity[] | null>(
      'countries',
    );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams).pagination().handle();

    const countries = await this.countryRepository.findAll(query);

    await this.cacheManager.set('countries', countries);

    return countries;
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
