import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { QueryBuilder } from 'src/common/utils';
import { QueryParamsDto } from 'src/domain/dtos';
import { CurrencyEntity } from 'src/domain/entities';
import { CurrencyRepository } from '../repositories/currency.repository';

@Injectable()
export class CurrencyService implements ServiceBase<CurrencyEntity> {
  constructor(
    private readonly currencyRepository: CurrencyRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findAll(queryParams: QueryParamsDto): Promise<CurrencyEntity[]> {
    const cache = await this.cacheManager.get<CurrencyEntity[] | null>(
      'currencies',
    );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams).pagination().handle();

    const currencies = await this.currencyRepository.findAll(query);

    await this.cacheManager.set('currencies', currencies);

    return currencies;
  }
}
