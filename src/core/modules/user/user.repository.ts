import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateUserDto, UpdateUserDto } from 'src/domain/dtos';
import { QueryBuilderEntity, UserEntity } from 'src/domain/entities';

@Injectable()
export class UserRepository extends RepositoryFactory<
  UserEntity,
  CreateUserDto & { avatar: string },
  UpdateUserDto & { avatar?: string }
> {
  constructor() {
    super('user');
  }

  findById(id: string): Promise<UserEntity> {
    return this.prismaService.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll(query: QueryBuilderEntity): Promise<UserEntity[]> {
    return this.prismaService.user.findMany(query);
  }
}
