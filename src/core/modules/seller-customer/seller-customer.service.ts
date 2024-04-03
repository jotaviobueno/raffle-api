import { Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateSellerCustomerDto } from 'src/domain/dtos';
import { SellerCustomerEntity } from 'src/domain/entities';
import { SellerCustomerRepository } from './seller-customer.repository';

@Injectable()
export class SellerCustomerService
  implements ServiceBase<SellerCustomerEntity, CreateSellerCustomerDto>
{
  constructor(
    private readonly sellerCustomerRepository: SellerCustomerRepository,
  ) {}

  async create(dto: CreateSellerCustomerDto): Promise<SellerCustomerEntity> {
    const sellerCustomer = await this.sellerCustomerRepository.create(dto);

    return sellerCustomer;
  }
}
