import { Gateway } from '@prisma/client';

export class GatewayEntity implements Gateway {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
