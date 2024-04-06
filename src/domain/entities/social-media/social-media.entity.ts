import { SocialMedia } from '@prisma/client';

export class SocialMediaEntity implements SocialMedia {
  id: string;
  name: string;
  href: string;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
