import { Module } from '@nestjs/common';
import { MailGateway } from './gateway/mail.gateway';
import { MailService } from './services/mail.service';

@Module({
  providers: [MailGateway, MailService],
  exports: [MailGateway, MailService],
})
export class MailModule {}
