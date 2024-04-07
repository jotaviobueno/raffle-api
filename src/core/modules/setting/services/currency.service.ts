import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { QueryBuilder } from 'src/common/utils';
import { QueryParamsDto } from 'src/domain/dtos';
import { CurrencyEntity, FindAllResultEntity } from 'src/domain/entities';
import { CurrencyRepository } from '../repositories/currency.repository';

@Injectable()
export class CurrencyService implements ServiceBase<CurrencyEntity> {
  constructor(
    private readonly currencyRepository: CurrencyRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<FindAllResultEntity<CurrencyEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<CurrencyEntity> | null>(
        `currencies_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams).sort().pagination().handle();

    const currencies = await this.currencyRepository.findAll(query);
    const total = await this.currencyRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`currencies_${queryParamsStringfy}`, {
      data: currencies,
      info,
    });

    return { data: currencies, info };
  }
}
