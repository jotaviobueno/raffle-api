import { RaffleCategory } from '@prisma/client';

export class RaffleCategoryEntity implements RaffleCategory {
  id: string;
  categoryId: string;
  raffleId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
