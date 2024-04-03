import { SellerCustomer } from '@prisma/client';

export class SellerCustomerEntity implements SellerCustomer {
  id: string;
  sellerId: string;
  customerId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
