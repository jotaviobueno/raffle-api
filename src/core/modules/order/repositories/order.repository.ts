import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateOrderDto } from 'src/domain/dtos';
import { OrderEntity } from 'src/domain/entities';

@Injectable()
export class OrderRepository extends RepositoryFactory<
  OrderEntity,
  CreateOrderDto
> {
  constructor() {
    super('order');
  }
}
