import { CartTotal } from '@prisma/client';

export class CartTotalEntity implements CartTotal {
  id: string;
  subtotal: number;
  discount: number;
  discountManual: number;
  shipping: number;
  total: number;
  cartId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
