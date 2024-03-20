import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { RedisModule } from './infra/redis/redis.module';
import { S3Module } from './core/modules/s3/s3.module';
import { HealthModule } from './core/modules/health/health.module';
import { UserModule } from './core/modules/user/user.module';
import { RoleModule } from './core/modules/role/role.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './core/modules/auth/guards';
import { AuthModule } from './core/modules/auth/auth.module';
import { SettingModule } from './core/modules/setting/setting.module';
import { AddressModule } from './core/modules/address/address.module';
import { SellerModule } from './core/modules/seller/seller.module';

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    S3Module,
    HealthModule,
    UserModule,
    RoleModule,
    AuthModule,
    SettingModule,
    AddressModule,
    SellerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
