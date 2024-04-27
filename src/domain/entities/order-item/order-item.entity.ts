import { OrderItem } from '@prisma/client';

export class OrderItemEntity implements OrderItem {
  id: string;
  quantity: number;
  price: number;
  total: number;
  tax: number;
  orderId: string;
  raffleId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
