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
  CreateSocialMediaDto,
  SearchSocialMediaDto,
  UpdateSocialMediaDto,
} from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators';
import { RoleGuard } from '../../role/guards';
import { Roles } from '../../role/decorators';
import { ROLE_ENUM } from 'src/common/enums';
import { SocialMediaService } from '../services/social-media.service';

@Controller('social-media')
@ApiTags('social-media')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Post()
  create(@Body() createSocialMediaDto: CreateSocialMediaDto) {
    return this.socialMediaService.create(createSocialMediaDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  @IsPublic()
  findAll(@Query() queryParams: SearchSocialMediaDto) {
    return this.socialMediaService.findAll(queryParams);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.socialMediaService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSocialMedia: UpdateSocialMediaDto,
  ) {
    return this.socialMediaService.update({ ...updateSocialMedia, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialMediaService.remove(id);
  }
}
