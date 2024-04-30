import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { QueryParamsDto } from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { StateService } from '../services/state.service';
import { IsPublic } from '../../auth/decorators';
import { ApiTags } from '@nestjs/swagger';

@IsPublic()
@Controller('state')
@ApiTags('state')
export class StateController {
  constructor(private readonly countryService: StateService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  @IsPublic()
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.countryService.findAll(queryParams);
  }
}
