export class SendMailDto {
  to: string;
  subject: string;
  template: string;
  context?: any;
}
