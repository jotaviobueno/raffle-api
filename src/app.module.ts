import { Module } from '@nestjs/common';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { RedisModule } from './infra/redis/redis.module';
import { S3Module } from './core/modules/s3/s3.module';
import { HealthModule } from './core/modules/health/health.module';
import { UserModule } from './core/modules/user/user.module';

@Module({
  imports: [PrismaModule, RedisModule, S3Module, HealthModule, UserModule],
})
export class AppModule {}
