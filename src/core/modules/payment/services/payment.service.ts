import { Injectable } from '@nestjs/common';
import { CartWithRelationsEntity } from 'src/domain/entities';
import { CreateCheckoutDto } from 'src/domain/dtos';
import { AsaasGateway } from '../../gateway/gateways/asaas.gateway';
import { GatewayConfigService } from '../../gateway/services/gateway-config.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly asaasGateway: AsaasGateway,
    private readonly gatewayConfigService: GatewayConfigService,
  ) {}

  async process(data: {
    cart: CartWithRelationsEntity;
    dto: CreateCheckoutDto;
  }) {
    const gatewayConfig = await this.gatewayConfigService.findByUserId(
      data.cart.seller.userId,
    );

    this.asaasGateway.setConfig(gatewayConfig.config);
    const response = await this.asaasGateway.process(data);

    return response;
  }
}
