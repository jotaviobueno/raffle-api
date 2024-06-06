import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { FinanceEntity, FindAllResultEntity } from 'src/domain/entities';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { SearchFinanceDto } from 'src/domain/dtos';
import { FinanceRepository } from '../repositories/finance.repository';

@Injectable()
export class FinanceService implements ServiceBase<FinanceEntity> {
  constructor(
    private readonly financeRepository: FinanceRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findAll(
    queryParams: SearchFinanceDto,
  ): Promise<FindAllResultEntity<FinanceEntity>> {
    const { sellerId, customerId, orderId } = queryParams;

    const queryParamsStringfy = JSON.stringify(queryParams);

    if (queryParams.cache) {
      const cache =
        await this.cacheManager.get<FindAllResultEntity<FinanceEntity> | null>(
          `finances_${queryParamsStringfy}`,
        );

      if (cache) return cache;
    }

    const query = new QueryBuilder(queryParams)
      .where({
        orderId: orderId && orderId,
        sellerId: sellerId && sellerId,
        customerId: customerId && customerId,
      })
      .sort()
      .date('createdAt')
      .pagination()
      .handle();

    const finances = await this.financeRepository.findAll(query);
    const total = await this.financeRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    if (queryParams.cache)
      await this.cacheManager.set(`finances_${queryParamsStringfy}`, {
        data: finances,
        info,
      });

    return { data: finances, info };
  }

  async findById(id: string): Promise<FinanceEntity> {
    const finance = await this.financeRepository.findById(id);

    if (!finance)
      throw new HttpException('Finance not found', HttpStatus.NOT_FOUND);

    return finance;
  }
}
