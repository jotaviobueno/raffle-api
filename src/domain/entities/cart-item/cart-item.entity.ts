import { CartItem } from '@prisma/client';

export class CartItemEntity implements CartItem {
  id: string;
  quantity: number;
  price: number;
  cartId: string;
  tax: number;
  total: number;
  raffleId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
