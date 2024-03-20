import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CurrencyEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class CurrencyRepository extends RepositoryFactory<CurrencyEntity> {
  constructor() {
    super('currency');
  }

  findAll(query: QueryBuilderEntity): Promise<CurrencyEntity[]> {
    return this.prismaService.currency.findMany(query);
  }
}
