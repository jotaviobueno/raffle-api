export class SendEmailDto {
  to: string;
  userId: string;
  subject: string;
  template: string;
  context: any;
}
