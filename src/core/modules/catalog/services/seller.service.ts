import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateSellerDto,
  QueryParamsDto,
  SearchSellerDto,
  UpdateSellerDto,
} from 'src/domain/dtos';
import {
  FindAllResultEntity,
  SellerEntity,
  SellerWithRelationsEntity,
} from 'src/domain/entities';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';
import { UserService } from '../../user/services/user.service';
import { SellerRepository } from '../repositories/seller.repository';
import { S3Service } from '../../setting/services/s3.service';

@Injectable()
export class SellerService
  implements ServiceBase<SellerEntity, CreateSellerDto, UpdateSellerDto>
{
  constructor(
    private readonly sellerRepository: SellerRepository,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly s3Service: S3Service,
  ) {}

  async create({
    file,
    ...dto
  }: CreateSellerDto & {
    file?: Express.Multer.File;
  }): Promise<SellerEntity> {
    const user = await this.userService.findById(dto.userId);

    const logo =
      file &&
      (await this.s3Service.singleFile({
        file,
        path: 'seller/logo',
      }));

    const seller = await this.sellerRepository.create({
      ...dto,
      userId: user.id,
      logo,
    });

    return seller;
  }

  async findByIdAndPopulate(id: string): Promise<SellerWithRelationsEntity> {
    const seller = await this.sellerRepository.findByIdAndPopulate(id);

    if (!seller)
      throw new HttpException('seller not found', HttpStatus.NOT_FOUND);

    return seller;
  }

  async findById(id: string): Promise<SellerEntity> {
    const seller = await this.sellerRepository.findById(id);

    if (!seller)
      throw new HttpException('seller not found', HttpStatus.NOT_FOUND);

    return seller;
  }

  async findAll({
    name,
    userId,
    ...queryParams
  }: SearchSellerDto): Promise<FindAllResultEntity<SellerEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<SellerEntity> | null>(
        `sellers_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .where({
        name: name && { contains: name },
        userId: userId && userId,
      })
      .sort()
      .pagination()
      .handle();

    const sellers = await this.sellerRepository.findAll(query);
    const total = await this.sellerRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`sellers_${queryParamsStringfy}`, {
      data: sellers,
      info,
    });

    return { data: sellers, info };
  }

  async update({
    file,
    ...dto
  }: UpdateSellerDto & {
    file?: Express.Multer.File;
  }): Promise<SellerEntity> {
    const seller = await this.findById(dto.id);

    const logo =
      file &&
      (await this.s3Service.singleFile({
        file,
        path: 'seller/logo',
      }));

    const update = await this.sellerRepository.update({
      ...dto,
      id: seller.id,
      logo,
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
