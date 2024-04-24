import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import { CartRepository } from './repositories/cart.repository';
import { CatalogModule } from '../catalog/catalog.module';
import { CartItemController } from './controllers/cart-item.controller';
import { CartItemService } from './services/cart-item.service';
import { CartItemRepository } from './repositories/cart-item.repository';
import { CartTotalService } from './services/cart-total.service';
import { CartTotalRepository } from './repositories/cart-total.repository';
import { UserModule } from '../user/user.module';
import { PaymentModule } from '../payment/payment.module';
import { CartPaymentService } from './services/cart-payment.service';
import { CartPaymentRepository } from './repositories/cart-payment.repository';
import { CartPaymentController } from './controllers/cart-payment.controller';

@Module({
  imports: [CatalogModule, UserModule, PaymentModule],
  controllers: [CartController, CartItemController, CartPaymentController],
  providers: [
    CartService,
    CartRepository,
    CartItemService,
    CartItemRepository,
    CartTotalService,
    CartTotalRepository,
    CartPaymentService,
    CartPaymentRepository,
  ],
  exports: [CartService, CartItemService, CartTotalService, CartPaymentService],
})
export class CartModule {}
