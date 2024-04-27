import { Injectable } from '@nestjs/common';
import { AsaasGateway } from '../../asaas/asaas.gateway';
import { OrderWithRelationsEntity } from 'src/domain/entities';
import { PaymentMethodService } from './payment-method.service';
import { CreateCheckoutDto } from 'src/domain/dtos';

@Injectable()
export class PaymentService {
  constructor(
    private readonly asaasGateway: AsaasGateway,
    private readonly paymentMethodService: PaymentMethodService,
  ) {}

  async process(data: {
    order: OrderWithRelationsEntity;
    dto: CreateCheckoutDto;
  }) {
    const paymentMethod =
      await this.paymentMethodService.findByIdAndReturnRelations(
        data.order.orderPayment.paymentMethod.id,
      );

    this.asaasGateway.setConfig(paymentMethod.paymentGatewayConfig.config);

    return this.asaasGateway.process(data);
  }
}
