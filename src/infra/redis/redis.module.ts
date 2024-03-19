import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedisClientOptions } from 'redis';
import { environment } from 'src/config';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      name: environment.REDIS_HOST,
      password: environment.REDIS_PASSWORD,
      database: +environment.REDIS_PORT,
    }),
  ],
})
export class RedisModule {}
