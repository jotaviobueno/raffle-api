import { SellerGatewayConfig, Prisma } from '@prisma/client';

export class SellerGatewayConfigEntity implements SellerGatewayConfig {
  id: string;
  gatewayId: string;
  sellerId: string | null;
  config: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
