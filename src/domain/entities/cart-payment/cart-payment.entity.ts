import { CartPayment } from '@prisma/client';

export class CartPaymentEntity implements CartPayment {
  id: string;
  method: string;
  paymentMethodId: string;
  addressId: string;
  paymentMethodCode: string | null;
  paymentMethodName: string | null;
  cartId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
