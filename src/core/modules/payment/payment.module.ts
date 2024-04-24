import { Module } from '@nestjs/common';
import { PaymentMethodController } from './controllers/payment-method.controller';
import { PaymentMethodService } from './services/payment-method.service';
import { PaymentMethodRepository } from './repositories/payment-method.repository';
import { PaymentGatewayConfigController } from './controllers/payment-gateway-config.controller';
import { PaymentGatewayConfigService } from './services/payment-gateway-config.service';
import { PaymentGatewayConfigRepository } from './repositories/payment-gateway-config.repository';

@Module({
  controllers: [PaymentMethodController, PaymentGatewayConfigController],
  providers: [
    PaymentMethodService,
    PaymentMethodRepository,
    PaymentGatewayConfigService,
    PaymentGatewayConfigRepository,
  ],
  exports: [PaymentMethodService, PaymentGatewayConfigService],
})
export class PaymentModule {}
