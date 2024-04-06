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
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators';
import { RoleGuard } from '../../role/guards';
import { Roles } from '../../role/decorators';
import { ROLE_ENUM } from 'src/common/enums';
import { AwardService } from '../services/award.service';

@Controller('award')
@ApiTags('award')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @Post()
  create(@Body() createAwardDto: CreateAwardDto) {
    return this.awardService.create(createAwardDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  @IsPublic()
  findAll(@Query() queryParams: SearchAwardDto) {
    return this.awardService.findAll(queryParams);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.awardService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAwardDto: UpdateAwardDto) {
    return this.awardService.update({ ...updateAwardDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.awardService.remove(id);
  }
}
