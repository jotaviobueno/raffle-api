import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { RedisModule } from 'src/infra/redis/redis.module';
import { UserRepository } from './user.repository';
import { S3Module } from '../s3/s3.module';
import { UserService } from './user.service';
import { CatalogModule } from '../catalog/catalog.module';
import { SellerSupplierModule } from '../seller-supplier/seller-supplier.module';
import { SellerCustomerModule } from '../seller-customer/seller-customer.module';

export const userModuleMock = {
  imports: [
    PrismaModule,
    RedisModule,
    S3Module,
    SellerSupplierModule,
    SellerCustomerModule,
    forwardRef(() => CatalogModule),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService],
};

@Module(userModuleMock)
export class UserModule {}
