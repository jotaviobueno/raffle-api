import { Module } from '@nestjs/common';
import { PaymentMethodController } from './controllers/payment-method.controller';
import { PaymentMethodService } from './services/payment-method.service';
import { PaymentMethodRepository } from './repositories/payment-method.repository';

@Module({
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, PaymentMethodRepository],
  exports: [PaymentMethodService],
})
export class PaymentModule {}
