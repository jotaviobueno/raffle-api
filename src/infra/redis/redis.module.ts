import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RedisClientOptions } from 'redis';
import { environment } from 'src/config';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      database: +environment.REDIS_PORT,
    }),
    BullModule.forRoot({
      redis: {
        port: +environment.REDIS_PORT,
      },
    }),
    EventEmitterModule.forRoot(),
  ],
})
export class RedisModule {}
