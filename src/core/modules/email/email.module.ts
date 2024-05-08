import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './services/email.service';
import { environment } from 'src/config';
import * as aws from 'aws-sdk';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { EmailConsumer } from './consumers/email.consumer';

@Module({
  imports: [
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
  providers: [EmailService, EmailConsumer],
  exports: [EmailService],
})
export class EmailModule {}
