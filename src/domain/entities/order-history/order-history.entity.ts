import { OrderHistory } from '@prisma/client';

export class OrderHistoryEntity implements OrderHistory {
  id: string;
  comment: string | null;
  orderId: string;
  customerId: string;
  orderStatusId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
