import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateUserDto, QueryParamsDto, UpdateUserDto } from 'src/domain/dtos';
import {
  FindAllResultEntity,
  RoleEntity,
  SellerEntity,
  UserEntity,
  UserRoleEntity,
} from 'src/domain/entities';
import { UserRepository } from '../repositories/user.repository';
import { QueryBuilder, hash } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { SellerService } from '../../catalog/services/seller.service';
import { UserRoleService } from '../../role/services/user-role.service';
import { ROLE_ENUM } from 'src/common/enums';
import { S3Service } from '../../setting/services/s3.service';

@Injectable()
export class UserService
  implements
    ServiceBase<
      UserEntity | Omit<UserEntity, 'password' | 'asaasCustomerId'>,
      CreateUserDto,
      UpdateUserDto
    >
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sellerService: SellerService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly userRoleService: UserRoleService,
    private readonly s3Service: S3Service,
  ) {}

  async create({
    sellerId,
    code,
    ...dto
  }: CreateUserDto): Promise<Omit<UserEntity, 'password' | 'asaasCustomerId'>> {
    if (code != ROLE_ENUM.USER) {
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

    if (
      (code === ROLE_ENUM.USER && !dto.password) ||
      !dto.document ||
      !dto.phone
    )
      throw new HttpException(
        'Not possible to create USER without password, document or phone',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    if (sellerId) await this.sellerService.findById(sellerId);

    const emailAlreadyExist = await this.userRepository.findByEmail(dto.email);

    if (emailAlreadyExist)
      throw new HttpException(
        'Email, phone or username already exist.',
        HttpStatus.CONFLICT,
      );

    if (code === ROLE_ENUM.USER) dto.password = await hash(dto.password);

    const user = await this.userRepository.create(dto);

    await this.userRoleService.assing({
      code,
      userId: user.id,
    });

    return user;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<
    FindAllResultEntity<Omit<UserEntity, 'password' | 'asaasCustomerId'>>
  > {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache = await this.cacheManager.get<FindAllResultEntity<
      Omit<UserEntity, 'password'>
    > | null>(`users_${queryParamsStringfy}`);

    if (cache) return cache;

    const query = new QueryBuilder(queryParams).sort().pagination().handle();

    const users = await this.userRepository.findAll(query);
    const total = await this.userRepository.count(query.where);

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

  async findByIdAndPopulate(id: string): Promise<
    Omit<UserEntity, 'password' | 'asaasCustomerId'> & {
      userRoles: (UserRoleEntity & {
        role: RoleEntity;
      })[];
    }
  > {
    const user = await this.userRepository.findByIdAndPopulate(id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async findById(id: string): Promise<UserEntity> {
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

  async update({
    file,
    ...dto
  }: UpdateUserDto & { file?: Express.Multer.File }): Promise<
    Omit<UserEntity, 'password' | 'asaasCustomerId'>
  > {
    const user = await this.findById(dto.id);

    const avatar =
      file && (await this.s3Service.singleFile({ file, path: 'user/avatar' }));

    const update = await this.userRepository.update({
      ...dto,
      id: user.id,
      avatar,
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
