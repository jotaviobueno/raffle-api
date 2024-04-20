import { PaymentMethod } from '@prisma/client';

export class PaymentMethodEntity implements PaymentMethod {
  id: string;
  code: string;
  name: string;
  instructions: string;
  isActive: boolean;
  paymentGatewayConfigId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
