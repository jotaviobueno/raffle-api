import { Module } from '@nestjs/common';
import { AsaasService } from './services/asaas.service';
import { AsaasGateway } from './gateways/asaas.gateway';
import { GatewayService } from './services/gateway.service';
import { GatewayRepository } from './repositories/gateway.repository';
import { GatewayConfigService } from './services/gateway-config.service';
import { GatewayConfigRepository } from './repositories/gateway-config.repository';
import { CreateAsaasCustomerUseCase } from './use-cases/customer';
import { AsaasHandlerUseCase } from './use-cases/handler';
import {
  AsaasProcessOrderByBankSlipUseCase,
  AsaasProcessOrderByCreditCardUseCase,
  AsaasProcessOrderByPixUseCase,
} from './use-cases/order';
import {
  AsaasProcessSubscriptionByPixUseCase,
  AsaasProcessSubscriptionByCreditCardUseCase,
  AsaasProcessSubscriptionByBillingTypeUseCase,
} from './use-cases/subscription';

@Module({
  providers: [
    AsaasService,
    AsaasGateway,
    GatewayService,
    GatewayRepository,
    GatewayConfigService,
    GatewayConfigRepository,
    AsaasProcessOrderByBankSlipUseCase,
    AsaasProcessOrderByCreditCardUseCase,
    AsaasProcessOrderByPixUseCase,
    AsaasProcessSubscriptionByPixUseCase,
    AsaasProcessSubscriptionByCreditCardUseCase,
    AsaasProcessSubscriptionByBillingTypeUseCase,
    CreateAsaasCustomerUseCase,
    AsaasHandlerUseCase,
  ],
  exports: [AsaasService, AsaasGateway, GatewayService, GatewayConfigService],
})
export class GatewayModule {}
