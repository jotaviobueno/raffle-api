import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import {
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
} from 'src/domain/dtos';
import { PaymentMethodEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class PaymentMethodRepository extends RepositoryFactory<
  PaymentMethodEntity,
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto
> {
  constructor() {
    super('paymentMethod');
  }

  findAll(query: QueryBuilderEntity): Promise<PaymentMethodEntity[]> {
    return this.prismaService.paymentMethod.findMany(query);
  }

  findById(id: string): Promise<PaymentMethodEntity | null> {
    return this.prismaService.paymentMethod.findFirst({
      where: { id, deletedAt: null },
    });
  }
}
