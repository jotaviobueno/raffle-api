import { Module } from '@nestjs/common';
import { CountryController } from './controllers/country.controller';
import { CountryService } from './services/country.service';
import { CountryRepository } from './repositories/country.repository';
import { StateController } from './controllers/state.controller';
import { StateService } from './services/state.service';
import { StateRepository } from './repositories/state.repository';
import { CurrencyRepository } from './repositories/currency.repository';
import { CurrencyService } from './services/currency.service';
import { CurrencyController } from './controllers/currency.controller';
import { MenuService } from './services/menu.service';
import { MenuRepository } from './repositories/menu.repository';
import { MenuController } from './controllers/menu.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [
    CountryController,
    StateController,
    CurrencyController,
    MenuController,
  ],
  providers: [
    CountryService,
    CountryRepository,
    StateService,
    StateRepository,
    CurrencyRepository,
    CurrencyService,
    MenuService,
    MenuRepository,
  ],
  exports: [CountryService, StateService, CurrencyService, MenuService],
})
export class SettingModule {}
