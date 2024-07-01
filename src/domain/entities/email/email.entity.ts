import { Email, Prisma } from '@prisma/client';

export class EmailEntity implements Email {
  id: string;
  userId: string;
  data: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
