import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateRaffleDto,
  SearchRaffleDto,
  UpdateRaffleDto,
} from 'src/domain/dtos';
import { FindAllResultEntity, RaffleEntity } from 'src/domain/entities';
import { RaffleRepository } from '../repository/raffle.repository';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { SellerService } from './seller.service';
import { S3Service } from '../../s3/s3.service';

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
    files?: Express.Multer.File[];
  }): Promise<RaffleEntity> {
    const seller = await this.sellerService.findById(dto.sellerId);

    const images =
      files &&
      (await this.s3Service.manyFiles(
        files.map((file) => ({ file, path: 'raffle' })),
      ));

    const product = await this.raffleRepository.create({
      ...dto,
      images,
      sellerId: seller.id,
    });

    return product;
  }

  async findAll({
    sellerId,
    isActive,
    isVisible,
    name,
    ...queryParams
  }: SearchRaffleDto): Promise<FindAllResultEntity<RaffleEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<RaffleEntity> | null>(
        `products_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .where({
        sellerId: sellerId && sellerId,
        isActive: isActive && isActive,
        isVisible: isVisible && isVisible,
        name: name && { contains: name },
      })
      .sort()
      .pagination()
      .handle();

    const products = await this.raffleRepository.findAll(query);
    const total = await this.raffleRepository.count();

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`products_${queryParamsStringfy}`, {
      data: products,
      info,
    });

    return { data: products, info };
  }

  async findById(id: string): Promise<RaffleEntity> {
    const product = await this.raffleRepository.findById(id);

    if (!product)
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);

    return product;
  }

  async update({
    files,
    ...dto
  }: UpdateRaffleDto & {
    files?: Express.Multer.File[];
  }): Promise<RaffleEntity> {
    const product = await this.findById(dto.id);

    const images =
      files &&
      (await this.s3Service.manyFiles(
        files.map((file) => ({ file, path: 'raffle' })),
      ));

    const update = await this.raffleRepository.update({
      ...dto,
      images,
      id: product.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const product = await this.findById(id);

    const remove = await this.raffleRepository.softDelete(product.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
