import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateWinnerDto, SearchWinnerDto } from 'src/domain/dtos';
import { WinnerEntity, FindAllResultEntity } from 'src/domain/entities';
import { RaffleService } from './raffle.service';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QuotasService } from './quotas.service';
import { WinnerRepository } from '../repositories/winner.repository';

@Injectable()
export class WinnerService
  implements ServiceBase<WinnerEntity, CreateWinnerDto>
{
  constructor(
    private readonly quotasService: QuotasService,
    private readonly raffleService: RaffleService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly winnerRepository: WinnerRepository,
  ) {}

  async create(dto: CreateWinnerDto): Promise<WinnerEntity> {
    const raffle = await this.raffleService.findById(dto.raffleId);

    const quotas = await this.quotasService.findByNumberAndRaffleId(
      dto.number,
      dto.raffleId,
    );

    const winner = await this.winnerRepository.create({
      ...dto,
      raffleId: raffle.id,
      customerId: quotas.customerId,
    });

    return winner;
  }

  async findAll({
    raffleId,
    customerId,
    number,
    ...queryParams
  }: SearchWinnerDto): Promise<FindAllResultEntity<WinnerEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<WinnerEntity> | null>(
        `winners_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .where({
        raffleId: raffleId && raffleId,
        customerId: customerId && customerId,
        number: number && number,
      })
      .sort()
      .pagination()
      .handle();

    const winners = await this.winnerRepository.findAll(query);
    const total = await this.winnerRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`winners_${queryParamsStringfy}`, {
      data: winners,
      info,
    });

    return { data: winners, info };
  }

  async findById(id: string): Promise<WinnerEntity> {
    const winner = await this.winnerRepository.findById(id);

    if (!winner)
      throw new HttpException('Winner not found', HttpStatus.NOT_FOUND);

    return winner;
  }

  async remove(id: string): Promise<boolean> {
    const winner = await this.findById(id);

    const remove = await this.winnerRepository.softDelete(winner.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
