import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateOrderStatusDto, UpdateOrderStatusDto } from 'src/domain/dtos';
import { OrderStatusEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class OrderStatusRepository extends RepositoryFactory<
  OrderStatusEntity,
  CreateOrderStatusDto,
  UpdateOrderStatusDto
> {
  constructor() {
    super('orderStatus');
  }

  findAll(query: QueryBuilderEntity): Promise<OrderStatusEntity[]> {
    return this.prismaService.orderStatus.findMany(query);
  }

  findById(id: string): Promise<OrderStatusEntity | null> {
    return this.prismaService.orderStatus.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findByName(name: string): Promise<OrderStatusEntity | null> {
    return this.prismaService.orderStatus.findFirst({
      where: {
        name,
        deletedAt: null,
      },
    });
  }
}
