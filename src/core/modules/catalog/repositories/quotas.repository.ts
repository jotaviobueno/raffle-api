import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateQuotasDto } from 'src/domain/dtos';
import { QueryBuilderEntity, QutoasEntity } from 'src/domain/entities';

@Injectable()
export class QutoasRepository extends RepositoryFactory<
  QutoasEntity,
  Omit<CreateQuotasDto & { number: string }, 'quantity'>
> {
  constructor() {
    super('quotas');
  }

  findAll(query: QueryBuilderEntity): Promise<QutoasEntity[]> {
    return this.prismaService.quotas.findMany(query);
  }

  findByNumberAndRaffleId(
    number: string,
    raffleId: string,
  ): Promise<QutoasEntity | null> {
    return this.prismaService.quotas.findFirst({
      where: {
        number,
        raffleId,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<QutoasEntity | null> {
    return this.prismaService.quotas.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
