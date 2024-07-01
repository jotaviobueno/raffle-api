import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { RedisModule } from './infra/redis/redis.module';
import { UserModule } from './core/modules/user/user.module';
import { RoleModule } from './core/modules/role/role.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './core/modules/auth/guards';
import { AuthModule } from './core/modules/auth/auth.module';
import { SettingModule } from './core/modules/setting/setting.module';
import { CatalogModule } from './core/modules/catalog/catalog.module';
import { CartModule } from './core/modules/cart/cart.module';
import { OrderModule } from './core/modules/order/order.module';
import { PaymentModule } from './core/modules/payment/payment.module';
import { MarketingModule } from './core/modules/marketing/marketing.module';
import { FinanceModule } from './core/modules/finance/finance.module';
import { GatewayModule } from './core/modules/gateway/gateway.module';
import { PlanModule } from './core/modules/plan/plan.module';
import { WebhookModule } from './core/modules/webhook/webhook.module';
import { NotificationModule } from './core/modules/notification/notification.module';

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    UserModule,
    RoleModule,
    AuthModule,
    SettingModule,
    CatalogModule,
    GatewayModule,
    CartModule,
    OrderModule,
    PaymentModule,
    MarketingModule,
    FinanceModule,
    PlanModule,
    WebhookModule,
    NotificationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
