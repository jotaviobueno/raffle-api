import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateUserRoleDto } from 'src/domain/dtos';
import { UserRoleEntity } from 'src/domain/entities';

@Injectable()
export class UserRoleRepository extends RepositoryFactory<
  UserRoleEntity,
  CreateUserRoleDto
> {
  constructor() {
    super('userRole');
  }

  findByUserIdAndRoleId(
    userId: string,
    roleId: string,
  ): Promise<UserRoleEntity | null> {
    return this.prismaService.userRole.findFirst({
      where: {
        userId,
        roleId,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<UserRoleEntity | null> {
    return this.prismaService.userRole.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
