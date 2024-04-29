import { Injectable } from '@nestjs/common';
import { AsaasGateway } from '../../asaas/gateway/asaas.gateway';
import { CartWithRelationsEntity } from 'src/domain/entities';
import { PaymentMethodService } from './payment-method.service';
import { CreateCheckoutDto } from 'src/domain/dtos';

@Injectable()
export class PaymentService {
  constructor(
    private readonly asaasGateway: AsaasGateway,
    private readonly paymentMethodService: PaymentMethodService,
  ) {}

  async process(data: {
    cart: CartWithRelationsEntity;
    dto: CreateCheckoutDto;
  }) {
    const paymentMethod =
      await this.paymentMethodService.findByIdAndReturnRelations(
        data.cart.cartPayment.paymentMethod.id,
      );

    this.asaasGateway.setConfig(paymentMethod.paymentGatewayConfig.config);

    const response = await this.asaasGateway.process(data);

    return response;
  }
}
