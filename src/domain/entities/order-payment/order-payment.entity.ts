import { OrderPayment } from '@prisma/client';

export class OrderPaymentEntity implements OrderPayment {
  id: string;
  orderId: string;
  method: string;
  paymentMethodId: string;
  addressId: string;
  paymentMethodCode: string | null;
  paymentMethodName: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
