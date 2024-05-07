import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateCustomerSellerDto } from 'src/domain/dtos';
import { CustomerSellerEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class CustomerSellerRepository extends RepositoryFactory<
  CustomerSellerEntity,
  CreateCustomerSellerDto
> {
  constructor() {
    super('customerSeller');
  }

  findById(id: string): Promise<CustomerSellerEntity | null> {
    return this.prismaService.customerSeller.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findByCustomerIdAndSellerId(
    customerId: string,
    sellerId: string,
  ): Promise<CustomerSellerEntity | null> {
    return this.prismaService.customerSeller.findFirst({
      where: {
        customerId,
        sellerId,
        deletedAt: null,
      },
    });
  }

  findAll(query: QueryBuilderEntity): Promise<CustomerSellerEntity[]> {
    return this.prismaService.customerSeller.findMany(query);
  }
}
