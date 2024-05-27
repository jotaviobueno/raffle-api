import { Controller, Get, UseInterceptors, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { SellerEntity } from '../../../../domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';
import { SellerDetailService } from '../services/seller-detail.service';
import { IsPublic } from '../../auth/decorators';

@Controller('seller-detail')
@ApiTags('seller-detail')
@ApiBearerAuth('defaultBearerAuth')
@IsPublic()
export class SellerDetailController {
  constructor(private readonly sellerDetailService: SellerDetailService) {}

  @Get(':id/customers')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  @ApiUnauthorizedResponse()
  @ApiOkFindAllResult(SellerEntity)
  findByIdCustomers(@Param('id') id: string) {
    return this.sellerDetailService.findByIdAndType(id, 'customers');
  }

  @Get(':id/sales')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  @ApiUnauthorizedResponse()
  @ApiOkFindAllResult(SellerEntity)
  findByIdSales(@Param('id') id: string) {
    return this.sellerDetailService.findByIdAndType(id, 'sales');
  }

  @Get(':id/orders')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  @ApiUnauthorizedResponse()
  @ApiOkFindAllResult(SellerEntity)
  findByIdOrders(@Param('id') id: string) {
    return this.sellerDetailService.findByIdAndType(id, 'orders');
  }
}
