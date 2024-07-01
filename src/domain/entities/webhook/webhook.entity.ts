import { Prisma, Webhook } from '@prisma/client';

export class WebhookEntity implements Webhook {
  id: string;
  event: string;
  data: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
