import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateAttributeDto, UpdateAttributeDto } from 'src/domain/dtos';
import { AttributeEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class AttributeRepository extends RepositoryFactory<
  AttributeEntity,
  CreateAttributeDto,
  UpdateAttributeDto
> {
  constructor() {
    super('attribute');
  }

  findAll(query: QueryBuilderEntity): Promise<AttributeEntity[]> {
    return this.prismaService.attribute.findMany(query);
  }

  findById(id: string): Promise<AttributeEntity | null> {
    return this.prismaService.attribute.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
