import { Module } from '@nestjs/common';
import { PaymentMethodController } from './controllers/payment-method.controller';
import { PaymentMethodService } from './services/payment-method.service';
import { PaymentMethodRepository } from './repositories/payment-method.repository';
import { PaymentService } from './services/payment.service';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [GatewayModule],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, PaymentMethodRepository, PaymentService],
  exports: [PaymentMethodService, PaymentService],
})
export class PaymentModule {}
