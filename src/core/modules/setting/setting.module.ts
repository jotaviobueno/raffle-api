import { Module } from '@nestjs/common';
import { CountryController } from './controllers/country.controller';
import { CountryService } from './services/country.service';
import { CountryRepository } from './repositories/country.repository';
import { StateController } from './controllers/state.controller';
import { StateService } from './services/state.service';
import { StateRepository } from './repositories/state.repository';
import { MenuService } from './services/menu.service';
import { MenuRepository } from './repositories/menu.repository';
import { MenuController } from './controllers/menu.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [CountryController, StateController, MenuController],
  providers: [
    CountryService,
    CountryRepository,
    StateService,
    StateRepository,
    MenuService,
    MenuRepository,
  ],
  exports: [CountryService, StateService, MenuService],
})
export class SettingModule {}
