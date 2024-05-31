import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { QueryBuilder } from 'src/common/utils';
import {
  CreateCustomerSellerDto,
  SearchCustomerSellerDto,
} from 'src/domain/dtos';
import { CustomerSellerEntity, FindAllResultEntity } from 'src/domain/entities';
import { CustomerSellerRepository } from '../repositories/customer-seller.repository';

@Injectable()
export class CustomerSellerService
  implements ServiceBase<CustomerSellerEntity, CreateCustomerSellerDto>
{
  constructor(
    private readonly customerSellerRepository: CustomerSellerRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateCustomerSellerDto): Promise<CustomerSellerEntity> {
    const customerAlreadyExistInSeller =
      await this.customerSellerRepository.findByCustomerIdAndSellerId(
        dto.customerId,
        dto.sellerId,
      );

    if (customerAlreadyExistInSeller)
      return this.customerSellerRepository.upsert({
        id: customerAlreadyExistInSeller.id,
        ...dto,
      });
    else return this.customerSellerRepository.create(dto);
  }

  async findAll(
    queryParams: SearchCustomerSellerDto,
  ): Promise<FindAllResultEntity<CustomerSellerEntity>> {
    const { sellerId, name } = queryParams;

    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<CustomerSellerEntity> | null>(
        `customer_sellers_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .where({
        sellerId: sellerId && sellerId,
        customer: name && {
          name: {
            contains: name,
          },
        },
      })
      .sort()
      .date('createdAt')
      .pagination()
      .handle();

    const customerSeller = await this.customerSellerRepository.findAll(query);
    const total = await this.customerSellerRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`customer_sellers_${queryParamsStringfy}`, {
      data: customerSeller,
      info,
    });

    return { data: customerSeller, info };
  }

  async findById(id: string): Promise<CustomerSellerEntity> {
    const customerSeller = await this.customerSellerRepository.findById(id);

    if (!customerSeller)
      throw new HttpException(
        'Customer seller not found',
        HttpStatus.NOT_FOUND,
      );

    return customerSeller;
  }
}
