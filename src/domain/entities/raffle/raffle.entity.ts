import { Raffle } from '@prisma/client';

export class RaffleEntity implements Raffle {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string[];
  price: number;
  isVisible: boolean;
  isActive: boolean;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
