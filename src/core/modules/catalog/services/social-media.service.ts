import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateSocialMediaDto,
  SearchSocialMediaDto,
  UpdateSocialMediaDto,
} from 'src/domain/dtos';
import { FindAllResultEntity, SocialMediaEntity } from 'src/domain/entities';
import { SocialMedialRepository } from '../repositories/social-media.repository';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { SellerService } from './seller.service';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class SocialMediaService
  implements
    ServiceBase<SocialMediaEntity, CreateSocialMediaDto, UpdateSocialMediaDto>
{
  constructor(
    private readonly socialMediaRepository: SocialMedialRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly sellerService: SellerService,
  ) {}

  async create(dto: CreateSocialMediaDto): Promise<SocialMediaEntity> {
    const seller = await this.sellerService.findById(dto.sellerId);

    const socialMedia = await this.socialMediaRepository.create({
      ...dto,
      sellerId: seller.id,
    });

    return socialMedia;
  }

  async findAll(
    queryParams: SearchSocialMediaDto,
  ): Promise<FindAllResultEntity<SocialMediaEntity>> {
    const { name, sellerId } = queryParams;

    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<SocialMediaEntity> | null>(
        `socialMedias_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .where({
        sellerId: sellerId && sellerId,
        name: name && { contains: name },
      })
      .sort()
      .date('createdAt')
      .pagination()
      .handle();

    const socialMedias = await this.socialMediaRepository.findAll(query);
    const total = await this.socialMediaRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`socialMedias_${queryParamsStringfy}`, {
      data: socialMedias,
      info,
    });

    return { data: socialMedias, info };
  }

  async findById(id: string): Promise<SocialMediaEntity> {
    const socialMedia = await this.socialMediaRepository.findById(id);

    if (!socialMedia)
      throw new HttpException('Social media not found', HttpStatus.NOT_FOUND);

    return socialMedia;
  }

  async update(dto: UpdateSocialMediaDto): Promise<SocialMediaEntity> {
    const socialMedia = await this.findById(dto.id);

    const update = await this.socialMediaRepository.update({
      ...dto,
      id: socialMedia.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const seller = await this.findById(id);

    const remove = await this.socialMediaRepository.softDelete(seller.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
