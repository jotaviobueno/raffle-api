import { PaymentGatewayConfig, Prisma } from '@prisma/client';

export class PaymentGatewayConfigEntity implements PaymentGatewayConfig {
  id: string;
  code: string;
  name: string;
  config: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
