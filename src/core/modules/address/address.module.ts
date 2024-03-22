import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { UserModule } from '../user/user.module';
import { SettingModule } from '../setting/setting.module';
import { AddressRepository } from './address.repository';
import { CatalogModule } from '../catalog/catalog.module';

@Module({
  imports: [UserModule, SettingModule, CatalogModule],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository],
  exports: [AddressService],
})
export class AddressModule {}
