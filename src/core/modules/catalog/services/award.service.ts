import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateAwardDto,
  SearchAwardDto,
  UpdateAwardDto,
} from 'src/domain/dtos';
import { AwardEntity, FindAllResultEntity } from 'src/domain/entities';
import { AwardRepository } from '../repositories/award.repository';
import { SellerService } from './seller.service';
import { RaffleService } from './raffle.service';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class AwardService
  implements ServiceBase<AwardEntity, CreateAwardDto, UpdateAwardDto>
{
  constructor(
    private readonly awardRepository: AwardRepository,
    private readonly sellerService: SellerService,
    private readonly raffleService: RaffleService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateAwardDto): Promise<AwardEntity> {
    const raffle = await this.raffleService.findById(dto.raffleId);

    const seller = await this.sellerService.findById(dto.sellerId);

    const award = await this.awardRepository.create({
      ...dto,
      raffleId: raffle.id,
      sellerId: seller.id,
    });

    return award;
  }

  async findAll(
    queryParams: SearchAwardDto,
  ): Promise<FindAllResultEntity<AwardEntity>> {
    const { raffleId, sellerId, name } = queryParams;

    const queryParamsStringfy = JSON.stringify(queryParams);

    if (queryParams.cache) {
      const cache =
        await this.cacheManager.get<FindAllResultEntity<AwardEntity> | null>(
          `awards_${queryParamsStringfy}`,
        );

      if (cache) return cache;
    }

    const query = new QueryBuilder(queryParams)
      .where({
        raffleId: raffleId && raffleId,
        sellerId: sellerId && sellerId,
        name: name && { contains: name },
      })
      .sort()
      .date('createdAt')
      .pagination()
      .handle();

    const awards = await this.awardRepository.findAll(query);
    const total = await this.awardRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    if (queryParams.cache)
      await this.cacheManager.set(`awards_${queryParamsStringfy}`, {
        data: awards,
        info,
      });

    return { data: awards, info };
  }

  async findById(id: string): Promise<AwardEntity> {
    const award = await this.awardRepository.findById(id);

    if (!award)
      throw new HttpException('Award not found', HttpStatus.NOT_FOUND);

    return award;
  }

  async update(dto: UpdateAwardDto): Promise<AwardEntity> {
    const award = await this.findById(dto.id);

    const update = await this.awardRepository.update({ ...dto, id: award.id });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const award = await this.findById(id);

    const remove = await this.awardRepository.softDelete(award.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
