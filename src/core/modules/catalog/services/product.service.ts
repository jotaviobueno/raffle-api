import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateProductDto,
  QueryParamsDto,
  UpdateProductDto,
} from 'src/domain/dtos';
import { FindAllResultEntity, ProductEntity } from 'src/domain/entities';
import { ProductRepository } from '../repository/product.repository';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { SellerService } from './seller.service';
import { BrandService } from './brand.service';

@Injectable()
export class ProductService
  implements ServiceBase<ProductEntity, CreateProductDto, UpdateProductDto>
{
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly sellerService: SellerService,
    private readonly brandService: BrandService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const seller = await this.sellerService.findById(dto.sellerId);

    if (dto.brandId) await this.brandService.findById(dto.brandId);

    const product = await this.productRepository.create({
      ...dto,
      sellerId: seller.id,
    });

    return product;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<FindAllResultEntity<ProductEntity>> {
    const cache =
      await this.cacheManager.get<FindAllResultEntity<ProductEntity> | null>(
        'products',
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams).pagination().handle();

    const products = await this.productRepository.findAll(query);
    const total = await this.productRepository.count();

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`products`, { data: products, info });

    return { data: products, info };
  }

  async findById(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);

    if (!product)
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);

    return product;
  }

  async update(dto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findById(dto.id);

    if (dto.brandId) await this.brandService.findById(dto.brandId);

    const update = await this.productRepository.update({
      ...dto,
      id: product.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const product = await this.findById(id);

    const remove = await this.productRepository.softDelete(product.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
