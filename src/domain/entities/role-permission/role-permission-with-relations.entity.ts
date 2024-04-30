import { RolePermissionEntity } from './role-permission.entity';
import { PermissionEntity } from '../permission';

export class RolePermissionWithRelationsEntity extends RolePermissionEntity {
  permission: PermissionEntity;
}
