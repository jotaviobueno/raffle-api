import { Order } from '@prisma/client';

export class OrderEntity implements Order {
  id: string;
  sellerId: string;
  customerId: string;
  invoiceNumber: number;
  invoicePrefix: string;
  comment: string | null;
  ip: string;
  userAgent: string;
  dueDate: Date | null;
  orderStatusId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
