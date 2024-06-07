import { Injectable } from '@nestjs/common';
import { AsaasGateway } from '../../asaas/asaas.gateway';
import { CartWithRelationsEntity } from 'src/domain/entities';
import { CreateCheckoutDto } from 'src/domain/dtos';
import { SellerGatewayConfigService } from '../../gateway/services/seller-gateway-config.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly asaasGateway: AsaasGateway,
    private readonly sellerGatewayConfigService: SellerGatewayConfigService,
  ) {}

  async process(data: {
    cart: CartWithRelationsEntity;
    dto: CreateCheckoutDto;
  }) {
    const sellerGatewayConfig =
      await this.sellerGatewayConfigService.findBySellerId(data.cart.seller.id);

    this.asaasGateway.setConfig(sellerGatewayConfig.config);

    const response = await this.asaasGateway.process(data);

    return response;
  }
}
