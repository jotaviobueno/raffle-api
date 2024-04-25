import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { PrismaModule } from 'src/infra/database/prisma/prisma.module';
import { RedisModule } from 'src/infra/redis/redis.module';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { CatalogModule } from '../catalog/catalog.module';
import { RoleModule } from '../role/role.module';
import { AddressController } from './controllers/address.controller';
import { AddressService } from './services/address.service';
import { AddressRepository } from './repositories/address.repository';
import { SettingModule } from '../setting/setting.module';

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    SettingModule,
    RoleModule,
    SettingModule,
    forwardRef(() => CatalogModule),
  ],
  controllers: [UserController, AddressController],
  providers: [UserRepository, UserService, AddressService, AddressRepository],
  exports: [UserService, AddressService],
})
export class UserModule {}
