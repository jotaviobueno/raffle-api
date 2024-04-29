import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateUserDto, UpdateUserDto } from 'src/domain/dtos';
import {
  QueryBuilderEntity,
  RoleEntity,
  UserEntity,
  UserRoleEntity,
} from 'src/domain/entities';

@Injectable()
export class UserRepository extends RepositoryFactory<
  UserEntity | Omit<UserEntity, 'password'>,
  Omit<CreateUserDto, 'code'>,
  UpdateUserDto & { avatar?: string }
> {
  constructor() {
    super('user');
  }

  create(
    data: Omit<CreateUserDto, 'code'>,
  ): Promise<UserEntity | Omit<UserEntity, 'password'>> {
    return this.prismaService.user.create({
      data,
      select: {
        id: true,
        lastName: true,
        firstName: true,
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        email: true,
        document: true,
        birthDate: true,
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

  findByIdAndPopulate(id: string): Promise<
    | (Omit<UserEntity, 'password'> & {
        userRoles: (UserRoleEntity & {
          role: RoleEntity;
        })[];
      })
    | null
  > {
    return this.prismaService.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
        lastName: true,
        firstName: true,
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        email: true,
        document: true,
        birthDate: true,
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  findById(id: string): Promise<UserEntity | null> {
    return this.prismaService.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        quotas: true,
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
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        email: true,
        document: true,
        birthDate: true,
      },
    });
  }

  update({
    id,
    ...data
  }: UpdateUserDto & { id: string; avatar?: string }): Promise<
    Omit<UserEntity, 'password'>
  > {
    return this.prismaService.user.update({
      where: { id },
      data,
      select: {
        id: true,
        lastName: true,
        firstName: true,
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        email: true,
        document: true,
        birthDate: true,
      },
    });
  }
}
