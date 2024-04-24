import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderRepository } from './repository/order.repository';
import { OrderController } from './controllers/order.controller';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService],
})
export class OrderModule {}
