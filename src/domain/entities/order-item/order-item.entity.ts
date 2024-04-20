import { OrderItem } from '@prisma/client';

export class OrderItemEntity implements OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  tax: number;
  orderId: string;
  quotasId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
