import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UpdateThemeDto } from 'src/domain/dtos';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RoleGuard } from '../../role/guards';
import { Permissions, Roles } from '../../role/decorators';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/common/enums';
import { AwardService } from '../services/award.service';
import { ThemeEntity } from 'src/domain/entities';

@Controller('theme')
@ApiTags('theme')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
@ApiBearerAuth('defaultBearerAuth')
export class ThemeController {
  constructor(private readonly themeService: AwardService) {}

  @Get(':id')
  @ApiOkResponse({ type: ThemeEntity })
  @Permissions(PERMISSION_ENUM.CAN_READ_THEME)
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  findById(@Param('id') id: string) {
    return this.themeService.findById(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_THEME)
  @ApiOkResponse({ type: ThemeEntity })
  @ApiBody({ type: UpdateThemeDto })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  update(@Param('id') id: string, @Body() updateThemeDto: UpdateThemeDto) {
    return this.themeService.update({ ...updateThemeDto, id });
  }
}
