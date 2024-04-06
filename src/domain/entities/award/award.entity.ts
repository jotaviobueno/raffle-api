import { Award } from '@prisma/client';

export class AwardEntity implements Award {
  id: string;
  name: string;
  sellerId: string;
  raffleId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
