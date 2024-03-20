import { Seller } from '@prisma/client';

export class SellerEntity implements Seller {
  id: string;
  name: string;
  userId: string;
  imageUrl: string | null;
  logoUrl: string | null;
  faviconUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
