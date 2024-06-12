import { File } from '@prisma/client';

export class FileEntity implements File {
  id: string;
  fieldname: string | null;
  filename: string | null;
  originalname: string | null;
  size: number | null;
  path: string | null;
  sellerId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
