import { Quotas } from '@prisma/client';

export class QutoasEntity implements Quotas {
  id: string;
  number: number;
  raffleId: string;
  customerId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
