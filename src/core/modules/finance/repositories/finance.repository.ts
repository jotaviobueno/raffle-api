import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { FinanceEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class FinanceRepository extends RepositoryFactory<FinanceEntity> {
  constructor() {
    super('finance');
  }

  findAll(query: QueryBuilderEntity): Promise<FinanceEntity[]> {
    return this.prismaService.finance.findMany({
      ...query,
      include: { financeTotal: true },
    });
  }

  findById(id: string): Promise<FinanceEntity | null> {
    return this.prismaService.finance.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
