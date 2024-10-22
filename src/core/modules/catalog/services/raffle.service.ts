import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateRaffleDto,
  SearchRaffleDto,
  UpdateRaffleDto,
} from 'src/domain/dtos';
import {
  FindAllResultEntity,
  RaffleEntity,
  RaffleWithRelationsEntity,
} from 'src/domain/entities';
import { RaffleRepository } from '../repositories/raffle.repository';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { SellerService } from './seller.service';
import { RaffleFileService } from './raffle-file.service';

@Injectable()
export class RaffleService
  implements
    ServiceBase<
      RaffleEntity | RaffleWithRelationsEntity,
      CreateRaffleDto,
      UpdateRaffleDto
    >
{
  constructor(
    private readonly raffleRepository: RaffleRepository,
    private readonly sellerService: SellerService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly raffleFileService: RaffleFileService,
  ) {}

  async create({ filesIds, ...dto }: CreateRaffleDto): Promise<RaffleEntity> {
    const seller = await this.sellerService.findById(dto.sellerId);

    const raffle = await this.raffleRepository.create({
      ...dto,
      digits: dto.totalNumbers.toString().length,
      final: dto.totalNumbers - 1,
      sellerId: seller.id,
    });

    await this.raffleFileService.createMany(
      filesIds.map((id) => ({
        fileId: id,
        raffleId: raffle.id,
      })),
    );

    return raffle;
  }

  async findAll(
    queryParams: SearchRaffleDto,
  ): Promise<FindAllResultEntity<RaffleWithRelationsEntity>> {
    const { sellerId, isActive, isVisible, name, isFinished } = queryParams;

    const queryParamsStringfy = JSON.stringify(queryParams);

    if (queryParams.cache) {
      const cache =
        await this.cacheManager.get<FindAllResultEntity<RaffleWithRelationsEntity> | null>(
          `raffles_${queryParamsStringfy}`,
        );

      if (cache) return cache;
    }

    const query = new QueryBuilder(queryParams)
      .where({
        sellerId: sellerId && sellerId,
        isActive: isActive && isActive,
        isVisible: isVisible && isVisible,
        isFinished: isFinished && isFinished,
        name: name && { contains: name },
      })
      .sort()
      .date('createdAt')
      .pagination()
      .handle();

    const raffles = await this.raffleRepository.findAll(query);
    const total = await this.raffleRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    if (queryParams.cache)
      await this.cacheManager.set(`raffles_${queryParamsStringfy}`, {
        data: raffles,
        info,
      });

    return { data: raffles, info };
  }

  async findById(id: string): Promise<RaffleEntity> {
    const raffle = await this.raffleRepository.findById(id);

    if (!raffle)
      throw new HttpException('raffle not found', HttpStatus.NOT_FOUND);

    return raffle;
  }

  async update({ filesIds, ...dto }: UpdateRaffleDto): Promise<RaffleEntity> {
    const raffle = await this.findById(dto.id);

    if (dto.totalNumbers && dto.totalNumbers < raffle.totalNumbers)
      throw new HttpException(
        'you cannot upgrade to a lower value',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const numbersNewConfig = dto.totalNumbers && {
      isFinished:
        raffle.isFinished && dto?.totalNumbers ? false : raffle.isFinished,
      digits: dto.totalNumbers.toString().length,
      final: dto.totalNumbers - 1,
    };

    const update = await this.raffleRepository.update({
      ...dto,
      ...numbersNewConfig,
      id: raffle.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    if (filesIds)
      await this.raffleFileService.createMany(
        filesIds.map((id) => ({
          fileId: id,
          raffleId: raffle.id,
        })),
      );

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const raffle = await this.findById(id);

    const remove = await this.raffleRepository.softDelete(raffle.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
