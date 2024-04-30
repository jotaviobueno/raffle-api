import { Permission } from '@prisma/client';

export class PermissionEntity implements Permission {
  id: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
