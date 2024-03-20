import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateUserDto, QueryParamsDto, UpdateUserDto } from 'src/domain/dtos';
import { FindAllResultEntity, UserEntity } from 'src/domain/entities';
import { UserRepository } from './user.repository';
import { QueryBuilder, hash } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

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
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
    const emailAlreadyExist = await this.userRepository.findByEmail(dto.email);

    if (emailAlreadyExist)
      throw new HttpException(
        'Email, phone or username already exist.',
        HttpStatus.CONFLICT,
      );

    const usernameAlreadyExist = await this.userRepository.findByUsername(
      dto.username,
    );

    if (usernameAlreadyExist)
      throw new HttpException(
        'Email, phone or username already exist.',
        HttpStatus.CONFLICT,
      );

    const phoneAlreadyExist = await this.userRepository.findByPhone(dto.phone);

    if (phoneAlreadyExist)
      throw new HttpException(
        'Email, phone or username already exist.',
        HttpStatus.CONFLICT,
      );

    dto.password = await hash(dto.password);

    const user = await this.userRepository.create(dto);

    return user;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<FindAllResultEntity<Omit<UserEntity, 'password'>>> {
    const cache = await this.cacheManager.get<FindAllResultEntity<
      Omit<UserEntity, 'password'>
    > | null>('users');

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

    await this.cacheManager.set(`users`, { data: users, info });

    return { data: users, info };
  }

  async findById(id: string): Promise<Omit<UserEntity, 'password'>> {
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

    if (dto.username && dto.username != user.username) {
      const usernameAlreadyExist = await this.userRepository.findByUsername(
        dto.username,
      );

      if (usernameAlreadyExist)
        throw new HttpException(
          'phone or username already exist.',
          HttpStatus.CONFLICT,
        );
    }

    if (dto.phone && dto.phone != user.phone) {
      const phoneAlreadyExist = await this.userRepository.findByPhone(
        dto.phone,
      );

      if (phoneAlreadyExist)
        throw new HttpException(
          'phone or username already exist.',
          HttpStatus.CONFLICT,
        );
    }

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
