import { Module } from '@nestjs/common';
import { UtmCampaignController } from './controllers/utm-campaign.controller';
import { UtmCampaignService } from './services/utm-campaign.service';
import { UtmCampaignRepository } from './repositories/utm-campaign.repository';
import { CatalogModule } from '../catalog/catalog.module';

@Module({
  imports: [CatalogModule],
  controllers: [UtmCampaignController],
  providers: [UtmCampaignService, UtmCampaignRepository],
  exports: [UtmCampaignService],
})
export class MarketingModule {}
