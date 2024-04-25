import { Module } from '@nestjs/common';
import { UtmCampaignController } from './controllers/utm-campaign.controller';
import { UtmCampaignService } from './services/utm-campaign.service';
import { UtmCampaignRepository } from './repositories/utm-campaign.repository';
import { CatalogModule } from '../catalog/catalog.module';
import { CouponController } from './controllers/coupon.controller';
import { CouponService } from './services/coupon.service';
import { CouponRepository } from './repositories/coupon.repository';

@Module({
  imports: [CatalogModule],
  controllers: [UtmCampaignController, CouponController],
  providers: [
    UtmCampaignService,
    UtmCampaignRepository,
    CouponService,
    CouponRepository,
  ],
  exports: [UtmCampaignService, CouponService],
})
export class MarketingModule {}
