import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { RedisModule } from 'src/infra/redis/redis.module';
import { UserRepository } from './user.repository';
import { S3Module } from '../s3/s3.module';
import { UserService } from './user.service';
import { CatalogModule } from '../catalog/catalog.module';

export const userModuleMock = {
  imports: [PrismaModule, RedisModule, S3Module, CatalogModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService],
};

@Module(userModuleMock)
export class UserModule {}
