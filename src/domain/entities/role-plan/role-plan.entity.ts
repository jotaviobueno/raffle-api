import { RolePlan } from '@prisma/client';

export class RolePlanEntity implements RolePlan {
  id: string;
  roleId: string;
  planId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
