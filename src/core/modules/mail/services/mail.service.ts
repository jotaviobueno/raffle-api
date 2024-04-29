import { Injectable, Logger } from '@nestjs/common';
import { MailEntity } from 'src/domain/entities';
import * as nodemailer from 'nodemailer';
import { SendMailDto } from 'src/domain/dtos';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

@Injectable()
export class MailService {
  setConfig(config: MailEntity) {
    return nodemailer.createTransport({
      host: config.host,
      port: +config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
      from: config.fromEmail,
      name: config.fromName,
      tls: {
        rejectUnauthorized: config.rejectUnauthorized,
      },
    });
  }

  async send(
    transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>,
    dto: SendMailDto,
  ) {
    try {
      transporter.use(
        'compile',
        hbs({
          viewEngine: {
            extname: '.hbs',
            partialsDir: path.resolve('src/common/template/mail'),
            layoutsDir: path.resolve('src/common/template/layouts'),
            defaultLayout: 'default.hbs',
          },
          viewPath: path.resolve('src/common/template/mail'),
          extName: '.hbs',
        }),
      );

      const mailOptions = {
        to: dto.to,
        subject: dto.subject,
        template: dto.template,
        context: {
          code: dto.context,
        },
      };

      await transporter.sendMail(mailOptions);
    } catch (e) {
      new Logger('TRANSPORTER MIAL ERROR', e);
    }
  }
}
