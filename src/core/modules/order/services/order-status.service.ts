import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateOrderStatusDto,
  SearchOrderStatusDto,
  UpdateOrderStatusDto,
} from 'src/domain/dtos';
import { FindAllResultEntity, OrderStatusEntity } from 'src/domain/entities';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { OrderStatusRepository } from '../repositories/order-status.repository';

@Injectable()
export class OrderStatusService
  implements
    ServiceBase<OrderStatusEntity, CreateOrderStatusDto, UpdateOrderStatusDto>
{
  constructor(
    private readonly orderStatusRepository: OrderStatusRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateOrderStatusDto): Promise<OrderStatusEntity> {
    const orderStatus = await this.orderStatusRepository.create(dto);

    return orderStatus;
  }

  async findAll(
    queryParams: SearchOrderStatusDto,
  ): Promise<FindAllResultEntity<OrderStatusEntity>> {
    const { name, code } = queryParams;

    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<OrderStatusEntity> | null>(
        `order_status_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .where({
        name: name && { contains: name },
        code: code && { contains: code },
      })
      .sort()
      .date('createdAt')
      .pagination()
      .handle();

    const orderStatus = await this.orderStatusRepository.findAll(query);
    const total = await this.orderStatusRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`order_status_${queryParamsStringfy}`, {
      data: orderStatus,
      info,
    });

    return { data: orderStatus, info };
  }

  async findByCode(code: string): Promise<OrderStatusEntity> {
    const orderStatus = await this.orderStatusRepository.findByCode(code);

    if (!orderStatus)
      throw new HttpException('Order status not found', HttpStatus.NOT_FOUND);

    return orderStatus;
  }

  async findById(id: string): Promise<OrderStatusEntity> {
    const orderStatus = await this.orderStatusRepository.findById(id);

    if (!orderStatus)
      throw new HttpException('Order status not found', HttpStatus.NOT_FOUND);

    return orderStatus;
  }

  async update(dto: UpdateOrderStatusDto): Promise<OrderStatusEntity> {
    const orderStatus = await this.findById(dto.id);

    const update = await this.orderStatusRepository.update({
      ...dto,
      id: orderStatus.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const orderStatus = await this.findById(id);

    const remove = await this.orderStatusRepository.softDelete(orderStatus.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
