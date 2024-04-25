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
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators';
import { RoleGuard } from '../../role/guards';
import { Roles } from '../../role/decorators';
import { ROLE_ENUM } from 'src/common/enums';
import { UtmCampaignService } from '../services/utm-campaign.service';

@Controller('utm-campaign')
@ApiTags('utm-campaign')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
export class UtmCampaignController {
  constructor(private readonly utmCampaignService: UtmCampaignService) {}

  @Post()
  create(@Body() createUtmCampaignDto: CreateUtmCampaignDto) {
    return this.utmCampaignService.create(createUtmCampaignDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  @IsPublic()
  findAll(@Query() queryParams: SearchUtmCampaignDto) {
    return this.utmCampaignService.findAll(queryParams);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.utmCampaignService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUtmCampaignDto: UpdateUtmCampaignDto,
  ) {
    return this.utmCampaignService.update({ ...updateUtmCampaignDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utmCampaignService.remove(id);
  }
}
