import { GatewayConfig, Prisma } from '@prisma/client';

export class GatewayConfigEntity implements GatewayConfig {
  id: string;
  config: Prisma.JsonValue;
  gatewayId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  userId: string;
}
