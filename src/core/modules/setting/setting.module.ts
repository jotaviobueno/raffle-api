import { Module, forwardRef } from '@nestjs/common';
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
import { HealthController } from './controllers/health.controller';
import { S3Service } from './services/s3.service';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [forwardRef(() => UserModule), TerminusModule],
  controllers: [
    CountryController,
    StateController,
    MenuController,
    HealthController,
  ],
  providers: [
    CountryService,
    CountryRepository,
    StateService,
    StateRepository,
    MenuService,
    MenuRepository,
    S3Service,
  ],
  exports: [CountryService, StateService, MenuService, S3Service],
})
export class SettingModule {}
