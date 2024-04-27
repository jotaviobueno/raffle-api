import { Order } from '@prisma/client';

export class OrderEntity implements Order {
  id: string;
  sellerId: string;
  customerId: string;
  invoiceNumber: number | null;
  comment: string | null;
  ip: string | null;
  userAgent: string | null;
  dueDate: Date | null;
  orderStatusId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
