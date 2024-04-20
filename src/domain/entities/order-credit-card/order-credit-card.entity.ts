import { OrderCreditCard } from '@prisma/client';

export class OrderCreditCardEntity implements OrderCreditCard {
  id: string;
  brand: string;
  number: string;
  name: string;
  expirationMonth: number;
  expirationYear: number;
  cvv: number;
  token: string;
  status: string;
  orderPaymentId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
