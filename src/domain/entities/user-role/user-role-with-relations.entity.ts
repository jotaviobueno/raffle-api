import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity, RoleWithRelationsEntity } from '../role';
import { UserRoleEntity } from './user-role.entity';

export class UserRoleWithRelationsEntity extends UserRoleEntity {
  @ApiProperty({ type: RoleEntity })
  role: RoleWithRelationsEntity;
}
