import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreatePackDto, UpdatePackDto } from 'src/domain/dtos';
import { PackEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class PackRepository extends RepositoryFactory<
  PackEntity,
  CreatePackDto,
  UpdatePackDto
> {
  constructor() {
    super('pack');
  }

  findAll(query: QueryBuilderEntity): Promise<PackEntity[]> {
    return this.prismaService.pack.findMany(query);
  }

  findById(id: string): Promise<PackEntity | null> {
    return this.prismaService.pack.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
