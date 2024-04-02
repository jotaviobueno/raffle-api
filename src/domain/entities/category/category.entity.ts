import { Category } from '@prisma/client';

export class CategoryEntity implements Category {
  id: string;
  name: string;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
