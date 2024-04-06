import { Module, forwardRef } from '@nestjs/common';
import { RaffleRepository } from './repository/raffle.repository';
import { SellerService } from './services/seller.service';
import { SellerRepository } from './repository/seller.repository';
import { UserModule } from '../user/user.module';
import { SellerController } from './controllers/seller.controller';
import { ProductController } from './controllers/raffle.controller';
import { CategortyController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { CategoryRepository } from './repository/category.repository';
import { RaffleService } from './services/raffle.service';
import { S3Module } from '../s3/s3.module';
import { AwardController } from './controllers/award.controller';
import { AwardService } from './services/award.service';
import { AwardRepository } from './repository/award.repository';

@Module({
  imports: [forwardRef(() => UserModule), S3Module],
  controllers: [
    SellerController,
    ProductController,
    CategortyController,
    AwardController,
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
  ],
  exports: [SellerService, RaffleService, CategoryService, AwardService],
})
export class CatalogModule {}
