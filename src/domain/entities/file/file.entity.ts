import { File } from '@prisma/client';

export class FileEntity implements File {
  id: string;
  userId: string | null;
  sellerId: string | null;
  raffleId: string | null;
  path: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
