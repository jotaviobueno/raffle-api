import { RolePermissionWithRelationsEntity } from '../role-permission';
import { RoleEntity } from './role.entity';

export class RoleWithRelationsEntity extends RoleEntity {
  rolePermissions: RolePermissionWithRelationsEntity[];
}
