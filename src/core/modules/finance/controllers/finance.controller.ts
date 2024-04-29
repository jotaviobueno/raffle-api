import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SearchAwardDto } from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators';
import { RoleGuard } from '../../role/guards';
import { Roles } from '../../role/decorators';
import { ROLE_ENUM } from 'src/common/enums';
import { FinanceEntity } from 'src/domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';
import { FinanceService } from '../services/finance.service';

@Controller('finance')
@ApiTags('finance')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
@ApiBearerAuth('defaultBearerAuth')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  @IsPublic()
  @ApiOkFindAllResult(FinanceEntity)
  findAll(@Query() queryParams: SearchAwardDto) {
    return this.financeService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOkResponse({ type: FinanceEntity })
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  findById(@Param('id') id: string) {
    return this.financeService.findById(id);
  }
}
