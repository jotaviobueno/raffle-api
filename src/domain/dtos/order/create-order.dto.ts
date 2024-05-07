export class CreateOrderDto {
  sellerId: string;
  customerId: string;
  invoiceNumber?: number;
  invoicePrefix?: string;
  comment?: string;
  ip: string;
  userAgent: string;
  orderStatusId: string;
  dueDate: Date;
}
