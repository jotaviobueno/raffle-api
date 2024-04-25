import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUtmCampaignDto } from './create-utm-campaign.dto';

export class UpdateUtmCampaignDto extends PartialType(
  OmitType(CreateUtmCampaignDto, ['sellerId']),
) {
  id: string;
}
