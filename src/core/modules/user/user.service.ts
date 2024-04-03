import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateUserDto, QueryParamsDto, UpdateUserDto } from 'src/domain/dtos';
import {
  FindAllResultEntity,
  SellerEntity,
  UserEntity,
} from 'src/domain/entities';
import { UserRepository } from './user.repository';
import { QueryBuilder, hash } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { PUBLIC_ROLE_ENUM } from 'src/common/enums';
import { SellerService } from '../catalog/services/seller.service';
import { SellerSupplierService } from '../seller-supplier/seller-supplier.service';
import { SellerCustomerService } from '../seller-customer/seller-customer.service';

@Injectable()
export class UserService
  implements
    ServiceBase<
      UserEntity | Omit<UserEntity, 'password'>,
      CreateUserDto,
      UpdateUserDto
    >
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sellerService: SellerService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly sellerSupplierService: SellerSupplierService,
    private readonly sellerCustomerService: SellerCustomerService,
  ) {}

  async create({
    sellerId,
    ...dto
  }: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
    if (dto.role != PUBLIC_ROLE_ENUM.USER) {
      if (dto.password)
        throw new HttpException(
          'Not possible to create SUPPLIER or CUSTOMER with password',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );

      if (!sellerId)
        throw new HttpException(
          'Seller id is not sent',
          HttpStatus.BAD_REQUEST,
        );
    }

    if (dto.role === PUBLIC_ROLE_ENUM.USER && !dto.password)
      throw new HttpException(
        'Not possible to create USER without password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    if (sellerId) await this.sellerService.findById(sellerId);

    const emailAlreadyExist = await this.userRepository.findByEmail(dto.email);

    if (
      dto.role === PUBLIC_ROLE_ENUM.SUPPLIER &&
      emailAlreadyExist &&
      emailAlreadyExist.role === dto.role
    ) {
      await this.sellerSupplierService.create({
        sellerId: sellerId,
        supplierId: emailAlreadyExist.id,
      });

      return emailAlreadyExist;
    }

    if (
      dto.role === PUBLIC_ROLE_ENUM.CUSTOMER &&
      emailAlreadyExist &&
      emailAlreadyExist.role === dto.role
    ) {
      await this.sellerCustomerService.create({
        sellerId: sellerId,
        customerId: emailAlreadyExist.id,
      });

      return emailAlreadyExist;
    }

    if (dto.role === PUBLIC_ROLE_ENUM.USER) {
      if (emailAlreadyExist)
        throw new HttpException(
          'Email, phone or username already exist.',
          HttpStatus.CONFLICT,
        );

      dto.password = await hash(dto.password);
    }

    const user = await this.userRepository.create(dto);

    if (dto.role === PUBLIC_ROLE_ENUM.SUPPLIER)
      await this.sellerSupplierService.create({
        sellerId: sellerId,
        supplierId: user.id,
      });

    if (dto.role === PUBLIC_ROLE_ENUM.CUSTOMER)
      await this.sellerCustomerService.create({
        sellerId: sellerId,
        customerId: user.id,
      });

    return user;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<FindAllResultEntity<Omit<UserEntity, 'password'>>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache = await this.cacheManager.get<FindAllResultEntity<
      Omit<UserEntity, 'password'>
    > | null>(`users_${queryParamsStringfy}`);

    if (cache) return cache;

    const query = new QueryBuilder(queryParams).pagination().handle();

    const users = await this.userRepository.findAll(query);
    const total = await this.userRepository.count();

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`users_${queryParamsStringfy}`, {
      data: users,
      info,
    });

    return { data: users, info };
  }

  async findById(id: string): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async findAllSellerByUserId({
    userId,
    ...queryParams
  }: QueryParamsDto & { userId: string }): Promise<
    FindAllResultEntity<SellerEntity>
  > {
    const user = await this.findById(userId);

    const sellers = await this.sellerService.findAllSellerByUserId({
      ...queryParams,
      userId: user.id,
    });

    return sellers;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async update(dto: UpdateUserDto): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.findById(dto.id);

    const update = await this.userRepository.update({ ...dto, id: user.id });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.findById(id);

    const remove = await this.userRepository.softDelete(user.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
