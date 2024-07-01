import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateUserDto, QueryParamsDto, UpdateUserDto } from 'src/domain/dtos';
import {
  FindAllResultEntity,
  UserEntity,
  UserWithRelationsEntity,
} from 'src/domain/entities';
import { UserRepository } from '../repositories/user.repository';
import { QueryBuilder, hash } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { SellerService } from '../../catalog/services/seller.service';
import { EVENTS_ENUM } from 'src/common/enums';
import { EventEmitter2 } from '@nestjs/event-emitter';

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
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(dto: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
    switch (dto.code) {
      case 'CUSTOMER':
        return this.handleCreateCustomer(dto);
      case 'USER':
        return this.handleCreateUser(dto);
      default:
        throw new HttpException('Invalid type', HttpStatus.BAD_REQUEST);
    }
  }

  private async handleCreateUser({
    code,
    ...dto
  }: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
    await this.handleCreateValidation({
      ...dto,
      code,
    });

    dto.password = await hash(dto.password);

    const user = await this.userRepository.create(dto);

    this.eventEmitter.emit(EVENTS_ENUM.user.created, {
      userId: user.id,
      code,
    });

    return user;
  }

  private async handleCreateCustomer({
    code,
    sellerId,
    ...dto
  }: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
    const seller = await this.sellerService.findById(sellerId);

    await this.handleCreateValidation({
      ...dto,
      code,
    });

    const customer = await this.userRepository.create(dto);

    this.eventEmitter.emit(EVENTS_ENUM.customer.created, {
      userId: customer.id,
      code,
    });

    this.eventEmitter.emit(EVENTS_ENUM.customer.assign_to_seller, {
      customerId: customer.id,
      sellerId: seller.id,
    });

    return customer;
  }

  private async handleCreateValidation(
    dto: Omit<CreateUserDto, 'sellerId'>,
  ): Promise<void> {
    const mobilePhoneAlreadyExist = await this.userRepository.findByMobilePhone(
      dto.mobilePhone,
    );

    if (mobilePhoneAlreadyExist)
      throw new HttpException(
        'Email, phone or document already exist.',
        HttpStatus.CONFLICT,
      );

    const emailAlreadyExist = await this.userRepository.findByEmail(dto.email);

    if (emailAlreadyExist)
      throw new HttpException(
        'Email, phone or document already exist.',
        HttpStatus.CONFLICT,
      );

    const documentAlreadyExist = await this.userRepository.findByDocument(
      dto.document,
    );

    if (documentAlreadyExist)
      throw new HttpException(
        'Email, phone or document already exist.',
        HttpStatus.CONFLICT,
      );
  }

  async findCustomerByMobilePhone(mobilePhone: string): Promise<UserEntity> {
    const customer =
      await this.userRepository.findCustomerByMobilePhone(mobilePhone);

    if (!customer)
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);

    return customer;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<FindAllResultEntity<Omit<UserEntity, 'password'>>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    if (queryParams.cache) {
      const cache = await this.cacheManager.get<FindAllResultEntity<
        Omit<UserEntity, 'password'>
      > | null>(`users_${queryParamsStringfy}`);

      if (cache) return cache;
    }

    const query = new QueryBuilder(queryParams)
      .sort()
      .date('createdAt')
      .pagination()
      .handle();

    const users = await this.userRepository.findAll(query);
    const total = await this.userRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    if (queryParams.cache)
      await this.cacheManager.set(`users_${queryParamsStringfy}`, {
        data: users,
        info,
      });

    return { data: users, info };
  }

  async findByIdAndPopulate(id: string): Promise<UserWithRelationsEntity> {
    const user = await this.userRepository.findByIdAndPopulate(id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async update(dto: UpdateUserDto): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.findById(dto.id);

    if (dto?.document != user.document) {
      const documentAlreadyExist = await this.userRepository.findByDocument(
        dto.document,
      );

      if (documentAlreadyExist)
        throw new HttpException(
          'Email, phone or document already exist.',
          HttpStatus.CONFLICT,
        );
    }

    if (dto?.mobilePhone != user.mobilePhone) {
      const mobilePhoneAlreadyExist =
        await this.userRepository.findByMobilePhone(dto.mobilePhone);

      if (mobilePhoneAlreadyExist)
        throw new HttpException(
          'Email, phone or document already exist.',
          HttpStatus.CONFLICT,
        );
    }

    if (dto?.email != user.email) {
      const emailAlreadyExist = await this.userRepository.findByEmail(
        dto.email,
      );

      if (emailAlreadyExist)
        throw new HttpException(
          'Email, phone or document already exist.',
          HttpStatus.CONFLICT,
        );
    }

    const update = await this.userRepository.update({
      ...dto,
      id: user.id,
    });

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
