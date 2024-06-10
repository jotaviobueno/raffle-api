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
import { RoleGuard } from '../../role/guards';
import { Permissions, Roles } from '../../role/decorators';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/common/enums';
import { ApiOkFindAllResult } from 'src/common/decorators';
import { PlanCycleEntity } from 'src/domain/entities';
import {
  CreatePlanCycleDto,
  QueryParamsDto,
  UpdatePlanCycleDto,
} from 'src/domain/dtos';
import { PlanCycleService } from '../services/plan-cycle.service';
import { IsPublic } from '../../auth/decorators';

@Controller('plan-cycle')
@ApiTags('plan-cycle')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
@ApiBearerAuth('defaultBearerAuth')
export class PlanCycleController {
  constructor(private readonly planCycleService: PlanCycleService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_CREATE_PLAN_CYCLE)
  @ApiCreatedResponse({ type: PlanCycleEntity })
  @ApiBody({ type: CreatePlanCycleDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  create(@Body() createPlanCycleDto: CreatePlanCycleDto) {
    return this.planCycleService.create(createPlanCycleDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @IsPublic()
  @Permissions(PERMISSION_ENUM.CAN_READ_PLAN_CYCLE)
  @ApiOkFindAllResult(PlanCycleEntity)
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.planCycleService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOkResponse({ type: PlanCycleEntity })
  @ApiNotFoundResponse()
  @Permissions(PERMISSION_ENUM.CAN_READ_PLAN_CYCLE)
  @ApiUnauthorizedResponse()
  findById(@Param('id') id: string) {
    return this.planCycleService.findById(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_PLAN_CYCLE)
  @ApiOkResponse({ type: PlanCycleEntity })
  @ApiBody({ type: UpdatePlanCycleDto })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  update(
    @Param('id') id: string,
    @Body() updatePlanCycleDto: UpdatePlanCycleDto,
  ) {
    return this.planCycleService.update({ ...updatePlanCycleDto, id });
  }

  @Delete(':id')
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  @Permissions(PERMISSION_ENUM.CAN_DELETE_PLAN_CYCLE)
  remove(@Param('id') id: string) {
    return this.planCycleService.remove(id);
  }
}
