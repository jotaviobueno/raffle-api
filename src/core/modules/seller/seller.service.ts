import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateSellerDto,
  QueryParamsDto,
  UpdateSellerDto,
} from 'src/domain/dtos';
import { FindAllResultEntity, SellerEntity } from 'src/domain/entities';
import { UserService } from '../user/user.service';
import { SellerRepository } from './seller.repository';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class SellerService
  implements ServiceBase<SellerEntity, CreateSellerDto, UpdateSellerDto>
{
  constructor(
    private readonly userService: UserService,
    private readonly sellerRepository: SellerRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateSellerDto): Promise<SellerEntity> {
    const user = await this.userService.findById(dto.userId);

    const seller = await this.sellerRepository.create({
      ...dto,
      userId: user.id,
    });

    return seller;
  }

  async findById(id: string): Promise<SellerEntity> {
    const seller = await this.sellerRepository.findById(id);

    if (!seller)
      throw new HttpException('seller not found', HttpStatus.NOT_FOUND);

    return seller;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<FindAllResultEntity<SellerEntity>> {
    const cache =
      await this.cacheManager.get<FindAllResultEntity<SellerEntity> | null>(
        'sellers',
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams).pagination().handle();

    const sellers = await this.sellerRepository.findAll(query);
    const total = await this.sellerRepository.count();

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`sellers`, { data: sellers, info });

    return { data: sellers, info };
  }

  async update(dto: UpdateSellerDto): Promise<SellerEntity> {
    const seller = await this.findById(dto.id);

    const update = await this.sellerRepository.update({
      ...dto,
      id: seller.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const seller = await this.findById(id);

    const remove = await this.sellerRepository.softDelete(seller.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
