import { RaffleFile } from '@prisma/client';

export class RaffleFileEntity implements RaffleFile {
  id: string;
  fileId: string;
  raffleId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
