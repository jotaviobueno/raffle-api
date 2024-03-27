import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repository/product.repository';
import { SellerService } from './services/seller.service';
import { SellerRepository } from './repository/seller.repository';
import { UserModule } from '../user/user.module';
import { SellerController } from './controllers/seller.controller';
import { ProductController } from './controllers/product.controller';
import { CondominiumController } from './controllers/condominium.controller';
import { CondominiumRepository } from './repository/condominium.repository';
import { CondominiumService } from './services/condominium.service';
import { SpecificationRepository } from './repository/specification.repository';
import { SpecificationService } from './services/specification.service';
import { SpecificationController } from './controllers/specifciation.controller';
import { AttributeController } from './controllers/attribute.controller';
import { AttributeService } from './services/attribute.service';
import { AttributeRepository } from './repository/attribute.repository';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [
    SellerController,
    ProductController,
    CondominiumController,
    SpecificationController,
    AttributeController,
  ],
  providers: [
    ProductService,
    ProductRepository,
    SellerService,
    SellerRepository,
    CondominiumService,
    CondominiumRepository,
    SpecificationRepository,
    SpecificationService,
    AttributeService,
    AttributeRepository,
  ],
  exports: [
    SellerService,
    ProductService,
    CondominiumService,
    SpecificationService,
    AttributeService,
  ],
})
export class CatalogModule {}
