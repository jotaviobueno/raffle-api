import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateOrderDto } from 'src/domain/dtos';
import {
  OrderEntity,
  OrderWithRelationsEntity,
  QueryBuilderEntity,
  orderQueryWithRelations,
} from 'src/domain/entities';

@Injectable()
export class OrderRepository extends RepositoryFactory<
  OrderEntity,
  CreateOrderDto
> {
  constructor() {
    super('order');
  }

  findAll(query: QueryBuilderEntity): Promise<OrderEntity[]> {
    return this.prismaService.order.findMany(query);
  }

  findByInvoiceNumber(
    invoiceNumber: number,
  ): Promise<OrderWithRelationsEntity> {
    return this.prismaService.order.findFirst({
      where: {
        invoiceNumber,
        deletedAt: null,
      },
      include: {
        ...orderQueryWithRelations,
      },
    });
  }

  findById(id: string): Promise<OrderWithRelationsEntity> {
    return this.prismaService.order.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        ...orderQueryWithRelations,
      },
    });
  }
}
