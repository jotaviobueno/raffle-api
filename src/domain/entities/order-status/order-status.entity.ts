import { OrderStatus } from '@prisma/client';

export class OrderStatusEntity implements OrderStatus {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
