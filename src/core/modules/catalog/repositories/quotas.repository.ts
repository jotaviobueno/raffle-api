import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateQuotasDto } from 'src/domain/dtos';
import { QueryBuilderEntity, QutoasEntity } from 'src/domain/entities';

@Injectable()
export class QutoasRepository extends RepositoryFactory<
  QutoasEntity,
  CreateQuotasDto & { number: string }
> {
  constructor() {
    super('quotas');
  }

  findAll(query: QueryBuilderEntity): Promise<QutoasEntity[]> {
    return this.prismaService.quotas.findMany(query);
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
