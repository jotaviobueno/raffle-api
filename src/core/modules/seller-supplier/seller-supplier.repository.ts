import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateSellerSupplierDto } from 'src/domain/dtos';
import { SellerSupplierEntity } from 'src/domain/entities';

@Injectable()
export class SellerSupplierRepository extends RepositoryFactory<
  SellerSupplierEntity,
  CreateSellerSupplierDto
> {
  constructor() {
    super('sellerSupplier');
  }
}
