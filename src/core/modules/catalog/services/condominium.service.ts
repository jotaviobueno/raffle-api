import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateCondominiumDto,
  SearchCondominiumDto,
  UpdateCondominiumDto,
} from 'src/domain/dtos';
import { CondominiumEntity, FindAllResultEntity } from 'src/domain/entities';
import { SellerService } from './seller.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';
import { CondominiumRepository } from '../repository/condominium.repository';

@Injectable()
export class CondominiumService
  implements
    ServiceBase<CondominiumEntity, CreateCondominiumDto, UpdateCondominiumDto>
{
  constructor(
    private readonly sellerService: SellerService,
    private readonly condominiumRepository: CondominiumRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateCondominiumDto): Promise<CondominiumEntity> {
    const seller = await this.sellerService.findById(dto.sellerId);

    const brand = await this.condominiumRepository.create({
      ...dto,
      sellerId: seller.id,
    });

    return brand;
  }

  async findAll({
    sellerId,
    name,
    ...queryParams
  }: SearchCondominiumDto): Promise<FindAllResultEntity<CondominiumEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<CondominiumEntity> | null>(
        `condominiums_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .pagination()
      .sort()
      .where({
        sellerId: sellerId && sellerId,
        name: name && { contains: name },
      })
      .handle();

    const condominiums = await this.condominiumRepository.findAll(query);
    const total = await this.condominiumRepository.count();

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`condominiums_${queryParamsStringfy}`, {
      data: condominiums,
      info,
    });

    return { data: condominiums, info };
  }

  async findById(id: string): Promise<CondominiumEntity> {
    const brand = await this.condominiumRepository.findById(id);

    if (!brand)
      throw new HttpException('brand not found', HttpStatus.NOT_FOUND);

    return brand;
  }

  async update(dto: UpdateCondominiumDto): Promise<CondominiumEntity> {
    const brand = await this.findById(dto.id);

    const update = await this.condominiumRepository.update({
      ...dto,
      id: brand.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const brand = await this.findById(id);

    const remove = await this.condominiumRepository.softDelete(brand.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
