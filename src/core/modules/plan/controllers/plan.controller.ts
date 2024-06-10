import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
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
import { IsPublic } from '../../auth/decorators';
import { RoleGuard } from '../../role/guards';
import { Permissions, Roles } from '../../role/decorators';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/common/enums';
import { ApiOkFindAllResult } from 'src/common/decorators';
import { PlanService } from '../services/plan.service';
import { PlanEntity } from 'src/domain/entities';
import { CreatePlanDto, QueryParamsDto, UpdatePlanDto } from 'src/domain/dtos';

@Controller('plan')
@ApiTags('plan')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
@ApiBearerAuth('defaultBearerAuth')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_CREATE_PLAN)
  @ApiCreatedResponse({ type: PlanEntity })
  @ApiBody({ type: CreatePlanDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @IsPublic()
  @ApiOkFindAllResult(PlanEntity)
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.planService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOkResponse({ type: PlanEntity })
  @ApiNotFoundResponse()
  @IsPublic()
  @ApiUnauthorizedResponse()
  findById(@Param('id') id: string) {
    return this.planService.findById(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_PLAN)
  @ApiOkResponse({ type: PlanEntity })
  @ApiBody({ type: UpdatePlanDto })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update({ ...updatePlanDto, id });
  }

  @Delete(':id')
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  @Permissions(PERMISSION_ENUM.CAN_DELETE_PLAN)
  remove(@Param('id') id: string) {
    return this.planService.remove(id);
  }
}
