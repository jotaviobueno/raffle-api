import { Module } from '@nestjs/common';
import { PaymentMethodController } from './controllers/payment-method.controller';
import { PaymentMethodService } from './services/payment-method.service';
import { PaymentMethodRepository } from './repositories/payment-method.repository';
import { PaymentService } from './services/payment.service';
import { AsaasModule } from '../asaas/asaas.module';

@Module({
  imports: [AsaasModule],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, PaymentMethodRepository, PaymentService],
  exports: [PaymentMethodService, PaymentService],
})
export class PaymentModule {}
