import { Module, forwardRef } from '@nestjs/common';
import { CountryController } from './controllers/country.controller';
import { CountryService } from './services/country.service';
import { CountryRepository } from './repositories/country.repository';
import { StateController } from './controllers/state.controller';
import { StateService } from './services/state.service';
import { StateRepository } from './repositories/state.repository';
import { UserModule } from '../user/user.module';
import { HealthController } from './controllers/health.controller';
import { S3Service } from './services/s3.service';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [forwardRef(() => UserModule), TerminusModule],
  controllers: [CountryController, StateController, HealthController],
  providers: [
    CountryService,
    CountryRepository,
    StateService,
    StateRepository,
    S3Service,
  ],
  exports: [CountryService, StateService, S3Service],
})
export class SettingModule {}
