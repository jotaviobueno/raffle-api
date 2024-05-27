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
import {
  CreateAwardDto,
  SearchAwardDto,
  UpdateAwardDto,
} from 'src/domain/dtos';
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
import { AwardService } from '../services/award.service';
import { AwardEntity } from 'src/domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';

@Controller('award')
@ApiTags('award')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
@ApiBearerAuth('defaultBearerAuth')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_CREATE_AWARD)
  @ApiCreatedResponse({ type: AwardEntity })
  @ApiBody({ type: CreateAwardDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  create(@Body() createAwardDto: CreateAwardDto) {
    return this.awardService.create(createAwardDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @IsPublic()
  @ApiOkFindAllResult(AwardEntity)
  findAll(@Query() queryParams: SearchAwardDto) {
    return this.awardService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOkResponse({ type: AwardEntity })
  @ApiNotFoundResponse()
  @IsPublic()
  @ApiUnauthorizedResponse()
  findById(@Param('id') id: string) {
    return this.awardService.findById(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_AWARD)
  @ApiOkResponse({ type: AwardEntity })
  @ApiBody({ type: UpdateAwardDto })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  update(@Param('id') id: string, @Body() updateAwardDto: UpdateAwardDto) {
    return this.awardService.update({ ...updateAwardDto, id });
  }

  @Delete(':id')
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  @Permissions(PERMISSION_ENUM.CAN_DELETE_AWARD)
  remove(@Param('id') id: string) {
    return this.awardService.remove(id);
  }
}
