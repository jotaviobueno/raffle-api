import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { QueryParamsDto } from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { CountryService } from '../services/country.service';
import { IsPublic } from '../../auth/decorators';
import { ApiTags } from '@nestjs/swagger';

@IsPublic()
@Controller('country')
@ApiTags('setting')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.countryService.findAll(queryParams);
  }

  @Get(':id/states')
  findAllCountryId(
    @Param('id') id: string,
    @Query() queryParams: QueryParamsDto,
  ) {
    return this.countryService.findAllCountryId({
      ...queryParams,
      countryId: id,
    });
  }
}
