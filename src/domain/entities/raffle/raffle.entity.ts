import { Raffle } from '@prisma/client';

export class RaffleEntity implements Raffle {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  isFinished: boolean;
  isVisible: boolean;
  isActive: boolean;
  sellerId: string;
  packages: string[];
  minBuyQuotas: number;
  maxBuyQuotas: number;
  progressPercentage: number;
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
