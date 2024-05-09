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
import { EmailService } from './services/email.service';
import { environment } from 'src/config';
import * as aws from 'aws-sdk';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailConsumer } from './consumers/email.consumer';

@Module({
  imports: [
    forwardRef(() => UserModule),
    TerminusModule,
    MailerModule.forRootAsync({
      useFactory: async () => {
        const dir = join(__dirname, '../../../../', '/templates');

        const ses = new aws.SES({
          accessKeyId: environment.AWS_ACCESS_ID,
          secretAccessKey: environment.AWS_ACCESS_SECRET,
          region: environment.AWS_REGION,
          apiVersion: '2012-10-17',
        });

        return {
          transport: {
            SES: {
              ses,
              aws,
            },
          },
          template: {
            dir,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
          defaults: {
            from: `"${environment.SMTP_FROM_NAME}" <${environment.SMTP_FROM_EMAIL}>`,
          },
        };
      },
    }),
  ],
  controllers: [CountryController, StateController, HealthController],
  providers: [
    CountryService,
    CountryRepository,
    StateService,
    StateRepository,
    S3Service,
    EmailService,
    EmailConsumer,
  ],
  exports: [CountryService, StateService, S3Service, EmailService],
})
export class SettingModule {}
