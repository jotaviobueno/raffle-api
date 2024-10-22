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
import { RoleGuard } from '../../role/guards';
import { Permissions, Roles } from '../../role/decorators';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/common/enums';
import { FinanceEntity } from 'src/domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';
import { FinanceService } from '../services/finance.service';
import { IsPublic } from '../../auth/decorators';

@Controller('finance')
@ApiTags('finance')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN)
@ApiBearerAuth('defaultBearerAuth')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get()
  @Permissions(PERMISSION_ENUM.CAN_READ_FINANCE)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @ApiOkFindAllResult(FinanceEntity)
  @IsPublic()
  findAll(@Query() queryParams: SearchAwardDto) {
    return this.financeService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOkResponse({ type: FinanceEntity })
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @Permissions(PERMISSION_ENUM.CAN_READ_FINANCE)
  findById(@Param('id') id: string) {
    return this.financeService.findById(id);
  }
}
