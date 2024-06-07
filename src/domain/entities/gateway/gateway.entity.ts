import { Gateway } from '@prisma/client';

export class GatewayEntity implements Gateway {
  id: string;
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
