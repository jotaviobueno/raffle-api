import { File } from '@prisma/client';

export class FileEntity implements File {
  id: string;
  fieldname: string | null;
  originalname: string | null;
  filename: string | null;
  path: string;
  size: number | null;
  destination: string | null;
  mimetype: string | null;
  sellerId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
