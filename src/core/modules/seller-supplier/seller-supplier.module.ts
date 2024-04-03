import { Module } from '@nestjs/common';
import { SellerSupplierService } from './seller-supplier.service';
import { SellerSupplierRepository } from './seller-supplier.repository';

@Module({
  providers: [SellerSupplierService, SellerSupplierRepository],
  exports: [SellerSupplierService],
})
export class SellerSupplierModule {}
