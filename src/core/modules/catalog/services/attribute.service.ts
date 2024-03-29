import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateAttributeDto,
  SearchAttributeDto,
  UpdateAttributeDto,
} from 'src/domain/dtos';
import { AttributeEntity, FindAllResultEntity } from 'src/domain/entities';
import { AttributeRepository } from '../repository/attribute.repository';
import { SellerService } from './seller.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class AttributeService
  implements
    ServiceBase<AttributeEntity, CreateAttributeDto, UpdateAttributeDto>
{
  constructor(
    private readonly attributeRepository: AttributeRepository,
    private readonly sellerService: SellerService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateAttributeDto): Promise<AttributeEntity> {
    const seller = await this.sellerService.findById(dto.sellerId);

    const attribute = await this.attributeRepository.create({
      ...dto,
      sellerId: seller.id,
    });

    return attribute;
  }

  async findAll({
    sellerId,
    name,
    ...queryParams
  }: SearchAttributeDto): Promise<FindAllResultEntity<AttributeEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<AttributeEntity> | null>(
        `attributes_${queryParamsStringfy}`,
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

    const attributes = await this.attributeRepository.findAll(query);
    const total = await this.attributeRepository.count();

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`attributes_${queryParamsStringfy}`, {
      data: attributes,
      info,
    });

    return { data: attributes, info };
  }

  async findById(id: string): Promise<AttributeEntity> {
    const attribute = await this.attributeRepository.findById(id);

    if (!attribute)
      throw new HttpException('Attribute not found', HttpStatus.NOT_FOUND);

    return attribute;
  }

  async update(dto: UpdateAttributeDto): Promise<AttributeEntity> {
    const attribute = await this.findById(dto.id);

    const update = await this.attributeRepository.update({
      ...dto,
      id: attribute.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const attribute = await this.findById(id);

    const remove = await this.attributeRepository.softDelete(attribute.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
