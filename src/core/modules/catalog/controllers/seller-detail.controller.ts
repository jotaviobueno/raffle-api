import { Controller, Get, UseInterceptors, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { SellerDetailService } from '../services/seller-detail.service';
import { IsPublic } from '../../auth/decorators';

@Controller('seller-detail')
@ApiTags('seller-detail')
@ApiBearerAuth('defaultBearerAuth')
@IsPublic()
export class SellerDetailController {
  constructor(private readonly sellerDetailService: SellerDetailService) {}

  @Get(':id/monthly-sales')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  findMonthlySales(@Param('id') id: string) {
    return this.sellerDetailService.findMonthlySales(id);
  }

  @Get(':id/customers')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  findByIdCustomers(@Param('id') id: string) {
    return this.sellerDetailService.findByIdAndType(id, 'customers');
  }

  @Get(':id/sales')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  findByIdSales(@Param('id') id: string) {
    return this.sellerDetailService.findByIdAndType(id, 'sales');
  }

  @Get(':id/orders')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  findByIdOrders(@Param('id') id: string) {
    return this.sellerDetailService.findByIdAndType(id, 'orders');
  }
}
