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

@Module({
  controllers: [CountryController, StateController, CurrencyController],
  providers: [
    CountryService,
    CountryRepository,
    StateService,
    StateRepository,
    CurrencyRepository,
    CurrencyService,
  ],
  exports: [CountryService, StateService, CurrencyService],
})
export class SettingModule {}
