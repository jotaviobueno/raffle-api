import { Mail } from '@prisma/client';

export class MailEntity implements Mail {
  id: string;
  host: string;
  port: string;
  user: string;
  pass: string;
  fromEmail: string;
  fromName: string;
  secure: boolean;
  rejectUnauthorized: boolean;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
