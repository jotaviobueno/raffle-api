import { RolePermission } from '@prisma/client';

export class RolePermissionEntity implements RolePermission {
  id: string;
  roleId: string;
  permissionId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
