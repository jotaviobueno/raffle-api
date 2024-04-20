import { OrderTotal } from '@prisma/client';

export class OrderTotalEntity implements OrderTotal {
  id: string;
  orderId: string;
  subtotal: number;
  discount: number;
  discountManual: number;
  shipping: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
