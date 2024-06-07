import { Module } from '@nestjs/common';
import { GatewayService } from './services/gateway.service';
import { GatewayRepository } from './repositories/gateway.repository';
import { SellerGatewayConfigService } from './services/seller-gateway-config.service';
import { SellerGatewayConfigRepository } from './repositories/seller-gateway-config.repository';

@Module({
  providers: [
    GatewayService,
    GatewayRepository,
    SellerGatewayConfigService,
    SellerGatewayConfigRepository,
  ],
  exports: [GatewayService, SellerGatewayConfigService],
})
export class GatewayModule {}
