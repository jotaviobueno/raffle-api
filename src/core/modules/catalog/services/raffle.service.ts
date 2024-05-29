import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateRaffleDto,
  SearchRaffleDto,
  UpdateRaffleDto,
} from 'src/domain/dtos';
import { FindAllResultEntity, RaffleEntity } from 'src/domain/entities';
import { RaffleRepository } from '../repositories/raffle.repository';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { SellerService } from './seller.service';
import { S3Service } from '../../setting/services/s3.service';

@Injectable()
export class RaffleService
  implements ServiceBase<RaffleEntity, CreateRaffleDto, UpdateRaffleDto>
{
  constructor(
    private readonly raffleRepository: RaffleRepository,
    private readonly sellerService: SellerService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly s3Service: S3Service,
  ) {}

  async create({
    files,
    ...dto
  }: CreateRaffleDto & {
    files: Express.Multer.File[];
  }): Promise<RaffleEntity> {
    const seller = await this.sellerService.findById(dto.sellerId);

    const images = await this.s3Service.manyFiles(
      files.map((file) => ({ file, path: 'raffle/images' })),
    );

    const raffle = await this.raffleRepository.create({
      ...dto,
      images,
      digits: dto.totalNumbers.toString().length,
      final: dto.totalNumbers - 1,
      sellerId: seller.id,
    });

    return raffle;
  }

  async findAll(
    queryParams: SearchRaffleDto,
  ): Promise<FindAllResultEntity<RaffleEntity>> {
    const { sellerId, isActive, isVisible, name, isFinished } = queryParams;

    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<RaffleEntity> | null>(
        `raffles_${queryParamsStringfy}`,
      );

    if (cache) return cache;

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

  async update({
    files,
    ...dto
  }: UpdateRaffleDto & {
    files?: Express.Multer.File[];
  }): Promise<RaffleEntity> {
    const raffle = await this.findById(dto.id);

    const images =
      files &&
      (await this.s3Service.manyFiles(
        files.map((file) => ({ file, path: 'raffle' })),
      ));

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
      images,
      id: raffle.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

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
