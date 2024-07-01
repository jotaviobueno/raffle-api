import { Notification } from '@prisma/client';

export class NotificationEntity implements Notification {
  id: string;
  userId: string;
  title: string;
  content: string;
  event: string;
  readAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
