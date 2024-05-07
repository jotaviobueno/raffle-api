import { CustomerSeller } from '@prisma/client';

export class CustomerSellerEntity implements CustomerSeller {
  id: string;
  customerId: string;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
