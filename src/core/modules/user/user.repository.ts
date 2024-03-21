import { Injectable } from '@nestjs/common';
import { ROLE_ENUM } from 'src/common/enums';
import { RepositoryFactory } from 'src/common/factories';
import { CreateUserDto, UpdateUserDto } from 'src/domain/dtos';
import { QueryBuilderEntity, UserEntity } from 'src/domain/entities';

@Injectable()
export class UserRepository extends RepositoryFactory<
  UserEntity | Omit<UserEntity, 'password'>,
  CreateUserDto,
  UpdateUserDto
> {
  constructor() {
    super('user');
  }

  create(
    data: CreateUserDto & { role: ROLE_ENUM },
  ): Promise<UserEntity | Omit<UserEntity, 'password'>> {
    return this.prismaService.user.create({
      data,
      select: {
        id: true,
        lastName: true,
        firstName: true,
        role: true,
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        username: true,
        email: true,
      },
    });
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.prismaService.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
  }

  findByUsername(username: string): Promise<UserEntity | null> {
    return this.prismaService.user.findFirst({
      where: {
        username,
        deletedAt: null,
      },
    });
  }

  findByPhone(phone: string): Promise<UserEntity | null> {
    return this.prismaService.user.findFirst({
      where: {
        phone,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<UserEntity | null> {
    return this.prismaService.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll(query: QueryBuilderEntity): Promise<Omit<UserEntity, 'password'>[]> {
    return this.prismaService.user.findMany({
      ...query,
      select: {
        id: true,
        lastName: true,
        firstName: true,
        role: true,
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        username: true,
        email: true,
      },
    });
  }
}
