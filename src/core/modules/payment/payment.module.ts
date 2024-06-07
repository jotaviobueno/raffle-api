import { Module } from '@nestjs/common';
import { PaymentMethodController } from './controllers/payment-method.controller';
import { PaymentMethodService } from './services/payment-method.service';
import { PaymentMethodRepository } from './repositories/payment-method.repository';
import { PaymentService } from './services/payment.service';
import { AsaasModule } from '../asaas/asaas.module';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [AsaasModule, GatewayModule],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, PaymentMethodRepository, PaymentService],
  exports: [PaymentMethodService, PaymentService],
})
export class PaymentModule {}
