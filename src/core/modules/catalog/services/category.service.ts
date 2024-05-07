import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateCategoryDto,
  SearchCategoryDto,
  UpdateCategoryDto,
} from 'src/domain/dtos';
import { CategoryEntity, FindAllResultEntity } from 'src/domain/entities';
import { CategoryRepository } from '../repositories/category.repository';
import { SellerService } from './seller.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class CategoryService
  implements ServiceBase<CategoryEntity, CreateCategoryDto, UpdateCategoryDto>
{
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly sellerService: SellerService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const seller = await this.sellerService.findById(dto.sellerId);

    const category = await this.categoryRepository.create({
      ...dto,
      sellerId: seller.id,
    });

    return category;
  }

  async findAll({
    sellerId,
    name,
    ...queryParams
  }: SearchCategoryDto): Promise<FindAllResultEntity<CategoryEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<CategoryEntity> | null>(
        `categories_${queryParamsStringfy}`,
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

    const categories = await this.categoryRepository.findAll(query);
    const total = await this.categoryRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`categories_${queryParamsStringfy}`, {
      data: categories,
      info,
    });

    return { data: categories, info };
  }

  async findById(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findById(id);

    if (!category)
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);

    return category;
  }

  async update(dto: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.findById(dto.id);

    const update = await this.categoryRepository.update({
      ...dto,
      id: category.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const category = await this.findById(id);

    const remove = await this.categoryRepository.softDelete(category.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
