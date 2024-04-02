import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repository/product.repository';
import { SellerService } from './services/seller.service';
import { SellerRepository } from './repository/seller.repository';
import { UserModule } from '../user/user.module';
import { SellerController } from './controllers/seller.controller';
import { ProductController } from './controllers/product.controller';
import { CategortyController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { CategoryRepository } from './repository/category.repository';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [SellerController, ProductController, CategortyController],
  providers: [
    ProductService,
    ProductRepository,
    SellerService,
    SellerRepository,
    CategoryService,
    CategoryRepository,
  ],
  exports: [SellerService, ProductService, CategoryService],
})
export class CatalogModule {}
