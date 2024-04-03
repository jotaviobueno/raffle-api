import { SellerSupplier } from '@prisma/client';

export class SellerSupplierEntity implements SellerSupplier {
  id: string;
  sellerId: string;
  supplierId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
