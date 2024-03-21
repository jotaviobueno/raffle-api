import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { QueryParamsDto } from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { IsPublic } from '../../auth/decorators';
import { CurrencyService } from '../services/currency.service';
import { ApiTags } from '@nestjs/swagger';

@IsPublic()
@Controller('currency')
@ApiTags('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.currencyService.findAll(queryParams);
  }
}
