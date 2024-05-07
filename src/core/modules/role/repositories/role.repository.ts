import { Injectable } from '@nestjs/common';
import { ROLE_ENUM } from 'src/common/enums';
import { RepositoryFactory } from 'src/common/factories';
import { CreateRoleDto, UpdateRoleDto } from 'src/domain/dtos';
import { QueryBuilderEntity, RoleEntity } from 'src/domain/entities';

@Injectable()
export class RoleRepository extends RepositoryFactory<
  RoleEntity,
  CreateRoleDto,
  UpdateRoleDto
> {
  constructor() {
    super('role');
  }

  findAll(query: QueryBuilderEntity): Promise<RoleEntity[]> {
    return this.prismaService.role.findMany(query);
  }

  findById(id: string): Promise<RoleEntity | null> {
    return this.prismaService.role.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findByCode(code: keyof typeof ROLE_ENUM): Promise<RoleEntity | null> {
    return this.prismaService.role.findFirst({
      where: {
        code,
        deletedAt: null,
      },
    });
  }
}
