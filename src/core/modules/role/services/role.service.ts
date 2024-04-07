import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { QueryBuilder } from 'src/common/utils';
import { CreateRoleDto, SearchRoleDto, UpdateRoleDto } from 'src/domain/dtos';
import { FindAllResultEntity, RoleEntity } from 'src/domain/entities';
import { RoleRepository } from '../repository/role.repository';
import { ROLE_ENUM } from 'src/common/enums';

@Injectable()
export class RoleService
  implements ServiceBase<RoleEntity, CreateRoleDto, UpdateRoleDto>
{
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly roleRepository: RoleRepository,
  ) {}

  async findAll({
    name,
    code,
    ...queryParams
  }: SearchRoleDto): Promise<FindAllResultEntity<RoleEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<RoleEntity> | null>(
        `roles_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .where({
        name: name && {
          contains: name,
        },
        code: code && {
          contains: code,
        },
      })
      .sort()
      .pagination()
      .handle();

    const roles = await this.roleRepository.findAll(query);
    const total = await this.roleRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`roles_${queryParamsStringfy}`, {
      data: roles,
      info,
    });

    return { data: roles, info };
  }

  async findById(id: string): Promise<RoleEntity> {
    const role = await this.roleRepository.findById(id);

    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);

    return role;
  }

  async findByCode(code: keyof typeof ROLE_ENUM): Promise<RoleEntity> {
    const role = await this.roleRepository.findByCode(code);

    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);

    return role;
  }

  async update(dto: UpdateRoleDto): Promise<RoleEntity> {
    const role = await this.findById(dto.id);

    const update = await this.roleRepository.update({ ...dto, id: role.id });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
