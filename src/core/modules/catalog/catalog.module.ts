import { Module, forwardRef } from '@nestjs/common';
import { RaffleRepository } from './repository/raffle.repository';
import { SellerService } from './services/seller.service';
import { SellerRepository } from './repository/seller.repository';
import { UserModule } from '../user/user.module';
import { SellerController } from './controllers/seller.controller';
import { ProductController } from './controllers/raffle.controller';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { CategoryRepository } from './repository/category.repository';
import { RaffleService } from './services/raffle.service';
import { S3Module } from '../s3/s3.module';
import { AwardController } from './controllers/award.controller';
import { AwardService } from './services/award.service';
import { AwardRepository } from './repository/award.repository';
import { SocialMediaController } from './controllers/social-media.controller';
import { SocialMediaService } from './services/social-media.service';
import { SocialMedialRepository } from './repository/social-media.repository';
import { RaffleCategoryRepository } from './repository/raffle-category.repository';
import { RaffleCategoryService } from './services/raffle-category.service';
import { RaffleCategoryController } from './controllers/raffle-category.controller';
import { PackController } from './controllers/pack.controller';
import { PackRepository } from './repository/pack.repository';
import { PackService } from './services/pack.service';

@Module({
  imports: [forwardRef(() => UserModule), S3Module],
  controllers: [
    SellerController,
    ProductController,
    CategoryController,
    AwardController,
    SocialMediaController,
    RaffleCategoryController,
    PackController,
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
    PackRepository,
    PackService,
  ],
  exports: [
    SellerService,
    RaffleService,
    CategoryService,
    AwardService,
    SocialMediaService,
    RaffleCategoryService,
    PackService,
  ],
})
export class CatalogModule {}
