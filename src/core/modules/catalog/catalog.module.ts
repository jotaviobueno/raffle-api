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
import { BrandService } from './services/brand.service';
import { BrandRepository } from './repository/brand.repository';
import { BrandController } from './controllers/brand.controller';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [
    SellerController,
    ProductController,
    CategortyController,
    BrandController,
  ],
  providers: [
    ProductService,
    ProductRepository,
    SellerService,
    SellerRepository,
    CategoryService,
    CategoryRepository,
    BrandService,
    BrandRepository,
  ],
  exports: [SellerService, ProductService, CategoryService, BrandService],
})
export class CatalogModule {}
