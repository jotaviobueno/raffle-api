import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
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
import { ThemeEntity } from 'src/domain/entities';
import { QueryParamsDto } from 'src/domain/dtos';
import { ThemeService } from '../services/theme.service';

@Controller('theme')
@ApiTags('theme')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
@ApiBearerAuth('defaultBearerAuth')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get(':id')
  @ApiOkResponse({ type: ThemeEntity })
  @Permissions(PERMISSION_ENUM.CAN_READ_THEME)
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  findById(@Param('id') id: string) {
    return this.themeService.findById(id);
  }

  @Get()
  @ApiOkResponse({ type: [ThemeEntity] })
  @Permissions(PERMISSION_ENUM.CAN_READ_THEME)
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.themeService.findAll(queryParams);
  }
}
