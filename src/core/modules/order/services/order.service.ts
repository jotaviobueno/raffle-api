import { Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateOrderDto } from 'src/domain/dtos';
import { OrderEntity } from 'src/domain/entities';
import { OrderRepository } from '../repositories/order.repository';

@Injectable()
export class OrderService implements ServiceBase<OrderEntity, CreateOrderDto> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async create(dto: CreateOrderDto): Promise<OrderEntity> {
    const order = await this.orderRepository.create(dto);

    return order;
  }
}
