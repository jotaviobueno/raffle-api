import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repository/product.repository';
import { SellerService } from './services/seller.service';
import { SellerRepository } from './repository/seller.repository';
import { UserModule } from '../user/user.module';
import { SellerController } from './controllers/seller.controller';
import { ProductController } from './controllers/product.controller';
import { BrandService } from './services/brand.service';
import { BrandRepository } from './repository/brand.repository';
import { BrandController } from './controllers/brand.controller';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [SellerController, ProductController, BrandController],
  providers: [
    ProductService,
    ProductRepository,
    SellerService,
    SellerRepository,
    BrandService,
    BrandRepository,
  ],
  exports: [SellerService, ProductService, BrandService],
})
export class CatalogModule {}
