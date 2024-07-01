import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from 'src/domain/dtos';
import { EmailRepository } from '../repositories/email.repository';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly emailRepository: EmailRepository,
  ) {}

  async sendEmail(data: SendEmailDto) {
    await this.emailRepository.create({
      userId: data.userId,
      data: {
        to: data.to,
        subject: data.subject,
        template: data.template,
        context: data.context,
      },
    });

    return this.mailerService.sendMail(data);
  }
}
