import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateUserRoleDto, UserCreateEventDto } from 'src/domain/dtos';
import { UserRoleEntity } from 'src/domain/entities';
import { UserRoleRepository } from '../repositories/user-role.repository';
import { UserService } from './user.service';
import { RoleService } from '../../role/services/role.service';
import { EVENTS_ENUM } from 'src/common/enums';
import { OnEvents } from 'src/common/decorators';

@Injectable()
export class UserRoleService
  implements ServiceBase<UserRoleEntity, CreateUserRoleDto>
{
  constructor(
    private readonly userRoleRepository: UserRoleRepository,
    private readonly roleService: RoleService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  @OnEvents([EVENTS_ENUM.customer.created, EVENTS_ENUM.user.created])
  async assing(dto: UserCreateEventDto): Promise<UserRoleEntity> {
    const role = await this.roleService.findByCode(dto.code);

    const userRole = await this.userRoleRepository.create({
      roleId: role.id,
      userId: dto.userId,
    });

    return userRole;
  }

  async create(dto: CreateUserRoleDto): Promise<UserRoleEntity> {
    const user = await this.userService.findById(dto.userId);

    const role = await this.roleService.findById(dto.roleId);

    const userAlreadyHaveThisRole =
      await this.userRoleRepository.findByUserIdAndRoleId(user.id, role.id);

    if (userAlreadyHaveThisRole)
      throw new HttpException(
        'User already have this role',
        HttpStatus.CONFLICT,
      );

    const userRole = await this.userRoleRepository.create(dto);

    return userRole;
  }

  async findById(id: string): Promise<UserRoleEntity> {
    const userRole = await this.userRoleRepository.findById(id);

    if (!userRole)
      throw new HttpException('User role not found', HttpStatus.NOT_FOUND);

    return userRole;
  }

  async remove(id: string): Promise<boolean> {
    const userRole = await this.findById(id);

    const remove = await this.userRoleRepository.softDelete(userRole.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}