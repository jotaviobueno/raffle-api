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
  CreateUtmCampaignDto,
  SearchUtmCampaignDto,
  UpdateUtmCampaignDto,
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
import { RoleGuard } from '../../role/guards';
import { Permissions, Roles } from '../../role/decorators';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/common/enums';
import { UtmCampaignService } from '../services/utm-campaign.service';
import { UtmCampaignEntity } from 'src/domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';

@Controller('utm-campaign')
@ApiTags('utm-campaign')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN)
@ApiBearerAuth('defaultBearerAuth')
export class UtmCampaignController {
  constructor(private readonly utmCampaignService: UtmCampaignService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_CREATE_UTM_CAMPAIGN)
  @ApiCreatedResponse({ type: UtmCampaignEntity })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiBody({ type: CreateUtmCampaignDto })
  @ApiUnauthorizedResponse()
  create(@Body() createUtmCampaignDto: CreateUtmCampaignDto) {
    return this.utmCampaignService.create(createUtmCampaignDto);
  }

  @Get()
  @Permissions(PERMISSION_ENUM.CAN_READ_UTM_CAMPAIGN)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @ApiOkFindAllResult(UtmCampaignEntity)
  findAll(@Query() queryParams: SearchUtmCampaignDto) {
    return this.utmCampaignService.findAll(queryParams);
  }

  @Get(':id')
  @Permissions(PERMISSION_ENUM.CAN_READ_UTM_CAMPAIGN)
  @ApiOkResponse({ type: UtmCampaignEntity })
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  findById(@Param('id') id: string) {
    return this.utmCampaignService.findById(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_UTM_CAMPAIGN)
  @ApiOkResponse({ type: UtmCampaignEntity })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiBody({ type: UpdateUtmCampaignDto })
  @ApiUnauthorizedResponse()
  @ApiNotAcceptableResponse()
  update(
    @Param('id') id: string,
    @Body() updateUtmCampaignDto: UpdateUtmCampaignDto,
  ) {
    return this.utmCampaignService.update({ ...updateUtmCampaignDto, id });
  }

  @Delete(':id')
  @Permissions(PERMISSION_ENUM.CAN_DELETE_UTM_CAMPAIGN)
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @ApiNotAcceptableResponse()
  remove(@Param('id') id: string) {
    return this.utmCampaignService.remove(id);
  }
}
