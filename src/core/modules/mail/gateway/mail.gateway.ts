import { Injectable } from '@nestjs/common';
import { MailEntity } from 'src/domain/entities';
import { SmtpGateway } from './smt.gateway';
import { SendMailDto } from 'src/domain/dtos';
import { MailService } from '../services/mail.service';

@Injectable()
export class MailGateway extends SmtpGateway {
  public config: any = {};

  constructor(private readonly mailService: MailService) {
    super();
  }

  setConfig(config: MailEntity): void {
    this.config = {
      host: config.host,
      port: +config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
      tls: {
        rejectUnauthorized: config.rejectUnauthorized,
      },
    };
  }

  async send(data: SendMailDto): Promise<void> {
    const transporter = this.mailService.setConfig(this.config);

    await this.mailService.send(transporter, data);
  }
}
