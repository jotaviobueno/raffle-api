import { Module } from '@nestjs/common';
import { AsaasService } from './services/asaas.service';
import { AsaasGateway } from './gateways/asaas.gateway';
import { GatewayService } from './services/gateway.service';
import { GatewayRepository } from './repositories/gateway.repository';
import { GatewayConfigService } from './services/gateway-config.service';
import { GatewayConfigRepository } from './repositories/gateway-config.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    AsaasService,
    AsaasGateway,
    GatewayService,
    GatewayRepository,
    GatewayConfigService,
    GatewayConfigRepository,
  ],
  exports: [AsaasService, AsaasGateway, GatewayService, GatewayConfigService],
})
export class GatewayModule {}
