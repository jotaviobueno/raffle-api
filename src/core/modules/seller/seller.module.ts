import { Module, forwardRef } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { SellerRepository } from './seller.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [SellerController],
  providers: [SellerService, SellerRepository],
  exports: [SellerService],
})
export class SellerModule {}
