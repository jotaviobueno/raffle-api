import { Module, forwardRef } from '@nestjs/common';
import { RaffleRepository } from './repositories/raffle.repository';
import { SellerService } from './services/seller.service';
import { SellerRepository } from './repositories/seller.repository';
import { UserModule } from '../user/user.module';
import { SellerController } from './controllers/seller.controller';
import { ProductController } from './controllers/raffle.controller';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { CategoryRepository } from './repositories/category.repository';
import { RaffleService } from './services/raffle.service';
import { AwardController } from './controllers/award.controller';
import { AwardService } from './services/award.service';
import { AwardRepository } from './repositories/award.repository';
import { SocialMediaController } from './controllers/social-media.controller';
import { SocialMediaService } from './services/social-media.service';
import { SocialMedialRepository } from './repositories/social-media.repository';
import { RaffleCategoryRepository } from './repositories/raffle-category.repository';
import { RaffleCategoryService } from './services/raffle-category.service';
import { RaffleCategoryController } from './controllers/raffle-category.controller';
import { SettingModule } from '../setting/setting.module';
import { QuotasService } from './services/quotas.service';
import { QutoasRepository } from './repositories/quotas.repository';
import { QuotasController } from './controllers/quotas.controller';
import { WinnerController } from './controllers/winner.controller';
import { WinnerRepository } from './repositories/winner.repository';
import { WinnerService } from './services/winner.service';

@Module({
  imports: [forwardRef(() => UserModule), SettingModule],
  controllers: [
    SellerController,
    ProductController,
    CategoryController,
    AwardController,
    SocialMediaController,
    RaffleCategoryController,
    QuotasController,
    WinnerController,
  ],
  providers: [
    RaffleService,
    RaffleRepository,
    SellerService,
    SellerRepository,
    CategoryService,
    CategoryRepository,
    AwardService,
    AwardRepository,
    SocialMediaService,
    SocialMedialRepository,
    RaffleCategoryService,
    RaffleCategoryRepository,
    QuotasService,
    QutoasRepository,
    WinnerRepository,
    WinnerService,
  ],
  exports: [
    SellerService,
    RaffleService,
    CategoryService,
    AwardService,
    SocialMediaService,
    RaffleCategoryService,
    QuotasService,
    WinnerService,
  ],
})
export class CatalogModule {}
