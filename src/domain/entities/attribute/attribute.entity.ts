import { Attribute } from '@prisma/client';

export class AttributeEntity implements Attribute {
  id: string;
  name: string;
  icon: string;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
