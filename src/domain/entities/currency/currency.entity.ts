import { Currency } from '@prisma/client';

export class CurrencyEntity implements Currency {
  id: string;
  code: string;
  symbol: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
