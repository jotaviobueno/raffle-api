import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from 'src/domain/dtos';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(data: SendEmailDto) {
    return this.mailerService.sendMail(data);
  }

  // async send() {
  //   const data = await this.mailerService.sendMail({
  //     to: 'talarikduceu@gmail.com', // list of receivers
  //     subject: 'Test', // Subject line
  //     template: './user/active-account.hbs',
  //     context: {
  //       name: 'Otavio Bueno',
  //       url: 'https://www.google.com',
  //     },
  //   });

  // }
}
