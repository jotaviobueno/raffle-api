import { Condominium } from '@prisma/client';

export class CondominiumEntity implements Condominium {
  id: string;
  name: string;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
