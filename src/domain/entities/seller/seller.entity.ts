import { Seller } from '@prisma/client';

export class SellerEntity implements Seller {
  id: string;
  name: string;
  userId: string;
  image: string;
  logo: string;
  favicon: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
