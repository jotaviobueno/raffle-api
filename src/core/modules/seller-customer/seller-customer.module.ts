import { Module } from '@nestjs/common';
import { SellerCustomerService } from './seller-customer.service';
import { SellerCustomerRepository } from './seller-customer.repository';

@Module({
  providers: [SellerCustomerService, SellerCustomerRepository],
  exports: [SellerCustomerService],
})
export class SellerCustomerModule {}
