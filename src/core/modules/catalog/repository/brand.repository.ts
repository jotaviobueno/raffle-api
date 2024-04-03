import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateBrandDto, UpdateBrandDto } from 'src/domain/dtos';
import { BrandEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class BrandRepository extends RepositoryFactory<
  BrandEntity,
  CreateBrandDto,
  UpdateBrandDto
> {
  constructor() {
    super('brand');
  }

  findAll(query: QueryBuilderEntity): Promise<BrandEntity[]> {
    return this.prismaService.brand.findMany(query);
  }

  findById(id: string): Promise<BrandEntity | null> {
    return this.prismaService.brand.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
