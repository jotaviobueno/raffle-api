import { Product } from '@prisma/client';

export class ProductEntity implements Product {
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
  condominiumId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
