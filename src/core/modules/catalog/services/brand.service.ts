import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateBrandDto,
  SearchBrandDto,
  UpdateBrandDto,
} from 'src/domain/dtos';
import { BrandEntity, FindAllResultEntity } from 'src/domain/entities';
import { BrandRepository } from '../repository/brand.repository';
import { SellerService } from './seller.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class BrandService
  implements ServiceBase<BrandEntity, CreateBrandDto, UpdateBrandDto>
{
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly sellerService: SellerService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateBrandDto): Promise<BrandEntity> {
    const seller = await this.sellerService.findById(dto.sellerId);

    const brand = await this.brandRepository.create({
      ...dto,
      sellerId: seller.id,
    });

    return brand;
  }

  async findAll({
    name,
    sellerId,
    ...queryParams
  }: SearchBrandDto): Promise<FindAllResultEntity<BrandEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<BrandEntity> | null>(
        `brands_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .where({
        sellerId: sellerId && sellerId,
        name: name && {
          contains: name,
        },
      })
      .sort()
      .pagination()
      .handle();

    const brands = await this.brandRepository.findAll(query);
    const total = await this.brandRepository.count();

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`brands_${queryParamsStringfy}`, {
      data: brands,
      info,
    });

    return { data: brands, info };
  }

  async findById(id: string): Promise<BrandEntity> {
    const brand = await this.brandRepository.findById(id);

    if (!brand)
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);

    return brand;
  }

  async update(dto: UpdateBrandDto): Promise<BrandEntity> {
    const brand = await this.findById(dto.id);

    const update = await this.brandRepository.update({ ...dto, id: brand.id });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const brand = await this.findById(id);

    const remove = await this.brandRepository.softDelete(brand.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
