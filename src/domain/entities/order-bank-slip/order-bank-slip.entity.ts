import { OrderBankSlip } from '@prisma/client';

export class OrderBankSlipEntity implements OrderBankSlip {
  id: string;
  orderPaymentId: string;
  ourNumber: string;
  identificationField: string;
  barCode: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
