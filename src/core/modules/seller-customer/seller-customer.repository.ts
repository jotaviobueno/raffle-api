import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateSellerCustomerDto } from 'src/domain/dtos';
import { SellerCustomerEntity } from 'src/domain/entities';

@Injectable()
export class SellerCustomerRepository extends RepositoryFactory<
  SellerCustomerEntity,
  CreateSellerCustomerDto
> {
  constructor() {
    super('sellerCustomer');
  }
}
