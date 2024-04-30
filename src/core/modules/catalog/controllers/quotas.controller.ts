import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateQuotasDto, SearchQuotasDto } from 'src/domain/dtos';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RoleGuard } from '../../role/guards';
import { Permissions, Roles } from '../../role/decorators';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/common/enums';
import { IsPublic } from '../../auth/decorators';
import { QuotasService } from '../services/quotas.service';
import { QutoasEntity } from 'src/domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';

@Controller('quotas')
@ApiTags('quotas')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
@ApiBearerAuth('defaultBearerAuth')
export class QuotasController {
  constructor(private readonly quotasService: QuotasService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_CREATE_QUOTAS)
  @ApiCreatedResponse({ type: QutoasEntity })
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiBody({ type: CreateQuotasDto })
  create(@Body() createQuotasDto: CreateQuotasDto) {
    return this.quotasService.create(createQuotasDto);
  }

  @Get()
  @IsPublic()
  @ApiOkFindAllResult(QutoasEntity)
  findAll(@Query() queryParams: SearchQuotasDto) {
    return this.quotasService.findAll(queryParams);
  }

  @Delete(':id')
  @Permissions(PERMISSION_ENUM.CAN_DELETE_QUOTAS)
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: Boolean })
  @ApiNotAcceptableResponse()
  remove(@Param('id') id: string) {
    return this.quotasService.remove(id);
  }
}
