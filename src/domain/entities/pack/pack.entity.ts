import { Pack } from '@prisma/client';

export class PackEntity implements Pack {
  id: string;
  quantity: number;
  price: number;
  raffleId: string;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
