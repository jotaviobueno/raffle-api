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

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [SellerController, ProductController, CategortyController],
  providers: [
    RaffleService,
    RaffleRepository,
    SellerService,
    SellerRepository,
    CategoryService,
    CategoryRepository,
  ],
  exports: [SellerService, RaffleService, CategoryService],
})
export class CatalogModule {}
