export class SendEmailDto {
  to: string;
  subject: string;
  template: string;
  context: any;
}
