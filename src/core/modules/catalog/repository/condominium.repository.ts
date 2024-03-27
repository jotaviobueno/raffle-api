import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateCondominiumDto, UpdateCondominiumDto } from 'src/domain/dtos';
import { CondominiumEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class CondominiumRepository extends RepositoryFactory<
  CondominiumEntity,
  CreateCondominiumDto,
  UpdateCondominiumDto
> {
  constructor() {
    super('condominium');
  }

  findAll(query: QueryBuilderEntity): Promise<CondominiumEntity[]> {
    return this.prismaService.condominium.findMany(query);
  }

  findById(id: string): Promise<CondominiumEntity | null> {
    return this.prismaService.condominium.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
