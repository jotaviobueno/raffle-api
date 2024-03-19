import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { RedisModule } from 'src/infra/redis/redis.module';
import { UserRepository } from './user.repository';
import {
  CreateUserUseCase,
  FindAllUserUseCase,
  FindByIdUserUseCase,
  SoftDeleteUserUseCase,
  UpdateUserUseCase,
} from './use-cases';
import { S3Module } from '../s3/s3.module';

export const userModuleMock = {
  imports: [PrismaModule, RedisModule, S3Module],
  controllers: [UserController],
  providers: [
    UserRepository,
    CreateUserUseCase,
    FindAllUserUseCase,
    FindByIdUserUseCase,
    SoftDeleteUserUseCase,
    UpdateUserUseCase,
  ],
  exports: [FindByIdUserUseCase],
};

@Module(userModuleMock)
export class UserModule {}
