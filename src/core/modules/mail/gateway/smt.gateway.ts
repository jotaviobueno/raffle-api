import { SendMailDto } from 'src/domain/dtos';
import { MailEntity } from 'src/domain/entities';

export abstract class SmtpGateway {
  public abstract setConfig(config: MailEntity): void;
  public abstract send(data: SendMailDto): Promise<void>;
}
