import { Cart } from '@prisma/client';

export class CartEntity implements Cart {
  id: string;
  customerId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}