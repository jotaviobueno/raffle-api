import { Role } from '@prisma/client';

export class RoleEntity implements Role {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
