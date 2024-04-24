import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import {
  CreatePaymentGatewayConfigDto,
  UpdatePaymentGatewayConfigDto,
} from 'src/domain/dtos';
import {
  PaymentGatewayConfigEntity,
  QueryBuilderEntity,
} from 'src/domain/entities';

@Injectable()
export class PaymentGatewayConfigRepository extends RepositoryFactory<
  PaymentGatewayConfigEntity,
  CreatePaymentGatewayConfigDto,
  UpdatePaymentGatewayConfigDto
> {
  constructor() {
    super('paymentGatewayConfig');
  }

  findAll(query: QueryBuilderEntity): Promise<PaymentGatewayConfigEntity[]> {
    return this.prismaService.paymentGatewayConfig.findMany(query);
  }

  findById(id: string): Promise<PaymentGatewayConfigEntity | null> {
    return this.prismaService.paymentGatewayConfig.findFirst({
      where: { id, deletedAt: null },
    });
  }
}
