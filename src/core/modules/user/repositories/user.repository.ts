import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateUserDto, UpdateUserDto } from 'src/domain/dtos';
import {
  QueryBuilderEntity,
  UserEntity,
  UserWithRelationsEntity,
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
        mobilePhone: true,
        fullName: true,
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        email: true,
        document: true,
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

  findByMobilePhone(mobilePhone: string): Promise<UserEntity | null> {
    return this.prismaService.user.findFirst({
      where: {
        mobilePhone,
        deletedAt: null,
      },
    });
  }

  findByIdAndPopulate(id: string): Promise<UserWithRelationsEntity | null> {
    return this.prismaService.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
        fullName: true,
        phone: true,
        mobilePhone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        email: true,
        document: true,
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
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
    });
  }

  findAll(query: QueryBuilderEntity): Promise<Omit<UserEntity, 'password'>[]> {
    return this.prismaService.user.findMany({
      ...query,
      select: {
        id: true,
        mobilePhone: true,
        fullName: true,
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        email: true,
        document: true,
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
        mobilePhone: true,
        fullName: true,
        phone: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        email: true,
        document: true,
      },
    });
  }
}
