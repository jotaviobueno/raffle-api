import { Raffle } from '@prisma/client';

export class RaffleEntity implements Raffle {
  id: string;
  title: string;
  metaTitle: string;
  shortDescription: string;
  description: string;
  images: string[];
  metaDescription: string;
  metaKeyword: string[];
  price: number;
  isVisible: boolean;
  isActive: boolean;
  sellerId: string;
  minBuyQuotas: number;
  maxBuyQuotas: number;
  totalQuotas: number;
  freePercentage: number;
  payeds: number;
  digits: number;
  initial: number;
  final: number;
  totalNumbers: number;
  drawDateAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
