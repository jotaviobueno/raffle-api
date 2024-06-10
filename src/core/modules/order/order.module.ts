import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderRepository } from './repositories/order.repository';
import { OrderController } from './controllers/order.controller';
import { PaymentModule } from '../payment/payment.module';
import { OrderStatusService } from './services/order-status.service';
import { OrderStatusRepository } from './repositories/order-status.repository';
import { OrderStatusController } from './controllers/order-status.controller';
import { CartModule } from '../cart/cart.module';
import { BullModule } from '@nestjs/bull';
import { QUEUES_ENUM } from 'src/common/enums';

@Module({
  imports: [
    PaymentModule,
    CartModule,
    BullModule.registerQueue(
      { name: QUEUES_ENUM.QUOTAS },
      { name: QUEUES_ENUM.EMAIL },
      { name: QUEUES_ENUM.USER_ROLE },
    ),
  ],
  controllers: [OrderController, OrderStatusController],
  providers: [
    OrderService,
    OrderRepository,
    OrderStatusService,
    OrderStatusRepository,
  ],
  exports: [OrderService, OrderStatusService],
})
export class OrderModule {}
