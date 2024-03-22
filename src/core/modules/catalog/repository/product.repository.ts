import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateProductDto, UpdateProductDto } from 'src/domain/dtos';
import { ProductEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class ProductRepository extends RepositoryFactory<
  ProductEntity,
  CreateProductDto,
  UpdateProductDto
> {
  constructor() {
    super('product');
  }

  findAll(query: QueryBuilderEntity): Promise<ProductEntity[]> {
    return this.prismaService.product.findMany(query);
  }

  findById(id: string): Promise<ProductEntity | null> {
    return this.prismaService.product.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
