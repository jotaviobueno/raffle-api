import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { RedisModule } from 'src/infra/redis/redis.module';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { CatalogModule } from '../catalog/catalog.module';
import { RoleModule } from '../role/role.module';
import { AddressController } from './controllers/address.controller';
import { AddressService } from './services/address.service';
import { AddressRepository } from './repositories/address.repository';
import { CustomerSellerService } from './services/customer-seller.service';
import { CustomerSellerRepository } from './repositories/customer-seller.repository';
import { CustomerSellerController } from './controllers/customer-seller.controller';
import { SettingModule } from '../setting/setting.module';

@Module({
  imports: [
    RedisModule,
    RoleModule,
    forwardRef(() => CatalogModule),
    SettingModule,
  ],
  controllers: [UserController, AddressController, CustomerSellerController],
  providers: [
    UserRepository,
    UserService,
    AddressService,
    AddressRepository,
    CustomerSellerService,
    CustomerSellerRepository,
  ],
  exports: [UserService, AddressService, CustomerSellerService],
})
export class UserModule {}
