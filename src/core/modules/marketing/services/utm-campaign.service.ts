import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateUtmCampaignDto,
  SearchUtmCampaignDto,
  UpdateUtmCampaignDto,
} from 'src/domain/dtos';
import { FindAllResultEntity, UtmCampaignEntity } from 'src/domain/entities';

import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { SellerService } from '../../catalog/services/seller.service';
import { UtmCampaignRepository } from '../repositories/utm-campaign.repository';

@Injectable()
export class UtmCampaignService
  implements
    ServiceBase<UtmCampaignEntity, CreateUtmCampaignDto, UpdateUtmCampaignDto>
{
  constructor(
    private readonly sellerService: SellerService,
    private readonly utmCampaignRepository: UtmCampaignRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateUtmCampaignDto): Promise<UtmCampaignEntity> {
    const seller = await this.sellerService.findById(dto.sellerId);

    const utmCampaign = await this.utmCampaignRepository.create({
      ...dto,
      sellerId: seller.id,
    });

    return utmCampaign;
  }

  async findAll({
    sellerId,
    name,
    isActive,
    description,
    from,
    to,
    ...queryParams
  }: SearchUtmCampaignDto): Promise<FindAllResultEntity<UtmCampaignEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<UtmCampaignEntity> | null>(
        `utm_campaigns_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .where({
        sellerId: sellerId && sellerId,
        name: name && { contains: name },
        isActive: isActive && isActive,
        description: description && { contains: name },
        to: to && { lte: to },
        from: from && { gte: from },
      })
      .sort()
      .pagination()
      .handle();

    const utmCampaigns = await this.utmCampaignRepository.findAll(query);
    const total = await this.utmCampaignRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`utm_campaigns_${queryParamsStringfy}`, {
      data: utmCampaigns,
      info,
    });

    return { data: utmCampaigns, info };
  }

  async findById(id: string): Promise<UtmCampaignEntity> {
    const utmCampaign = await this.utmCampaignRepository.findById(id);

    if (!utmCampaign)
      throw new HttpException('Utm campaign not found', HttpStatus.NOT_FOUND);

    return utmCampaign;
  }

  async update(dto: UpdateUtmCampaignDto): Promise<UtmCampaignEntity> {
    const utmCampaign = await this.findById(dto.id);

    const update = await this.utmCampaignRepository.update({
      ...dto,
      id: utmCampaign.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const utmCampaign = await this.findById(id);

    const remove = await this.utmCampaignRepository.softDelete(utmCampaign.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
