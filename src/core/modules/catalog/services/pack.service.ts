import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreatePackDto, SearchPackDto, UpdatePackDto } from 'src/domain/dtos';
import { FindAllResultEntity, PackEntity } from 'src/domain/entities';
import { PackRepository } from '../repository/pack.repository';
import { RaffleService } from './raffle.service';
import { SellerService } from './seller.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class PackService
  implements ServiceBase<PackEntity, CreatePackDto, UpdatePackDto>
{
  constructor(
    private readonly packRepository: PackRepository,
    private readonly raffleService: RaffleService,
    private readonly sellerService: SellerService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreatePackDto): Promise<PackEntity> {
    const seller = await this.sellerService.findById(dto.sellerId);

    const raffle = await this.raffleService.findById(dto.raffleId);

    const pack = await this.packRepository.create({
      ...dto,
      sellerId: seller.id,
      raffleId: raffle.id,
    });

    return pack;
  }

  async findById(id: string): Promise<PackEntity> {
    const pack = await this.packRepository.findById(id);

    if (!pack) throw new HttpException('Pack not found', HttpStatus.NOT_FOUND);

    return pack;
  }

  async findAll({
    raffleId,
    sellerId,
    ...queryParams
  }: SearchPackDto): Promise<FindAllResultEntity<PackEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<PackEntity> | null>(
        `packs_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .where({
        sellerId: sellerId && sellerId,
        raffleId: raffleId && raffleId,
      })
      .sort()
      .pagination()
      .handle();

    const packs = await this.packRepository.findAll(query);
    const total = await this.packRepository.count();

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`packs_${queryParamsStringfy}`, {
      data: packs,
      info,
    });

    return { data: packs, info };
  }

  async update(dto: UpdatePackDto): Promise<PackEntity> {
    const pack = await this.findById(dto.id);

    const update = await this.packRepository.update({ ...dto, id: pack.id });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const pack = await this.findById(id);

    const remove = await this.packRepository.softDelete(pack.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
