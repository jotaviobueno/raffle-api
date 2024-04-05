import { UserRole } from '@prisma/client';

export class UserRoleEntity implements UserRole {
  id: string;
  userId: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
