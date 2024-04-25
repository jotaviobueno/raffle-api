import { UtmCampaign } from '@prisma/client';

export class UtmCampaignEntity implements UtmCampaign {
  id: string;
  name: string;
  description: string | null;
  sellerId: string;
  from: Date | null;
  to: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
