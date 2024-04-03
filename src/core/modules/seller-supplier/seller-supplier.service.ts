import { Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateSellerSupplierDto } from 'src/domain/dtos';
import { SellerSupplierEntity } from 'src/domain/entities';
import { SellerSupplierRepository } from './seller-supplier.repository';

@Injectable()
export class SellerSupplierService
  implements ServiceBase<SellerSupplierEntity, CreateSellerSupplierDto>
{
  constructor(
    private readonly sellerSupplierRepository: SellerSupplierRepository,
  ) {}

  async create(dto: CreateSellerSupplierDto): Promise<SellerSupplierEntity> {
    const sellerSupplier = await this.sellerSupplierRepository.create(dto);

    return sellerSupplier;
  }
}
