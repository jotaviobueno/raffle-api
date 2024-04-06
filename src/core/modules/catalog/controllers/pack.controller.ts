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
import { CreatePackDto, SearchPackDto, UpdatePackDto } from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators';
import { RoleGuard } from '../../role/guards';
import { Roles } from '../../role/decorators';
import { ROLE_ENUM } from 'src/common/enums';
import { PackService } from '../services/pack.service';

@Controller('pack')
@ApiTags('pack')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
export class PackController {
  constructor(private readonly packService: PackService) {}

  @Post()
  create(@Body() createPackDto: CreatePackDto) {
    return this.packService.create(createPackDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  @IsPublic()
  findAll(@Query() queryParams: SearchPackDto) {
    return this.packService.findAll(queryParams);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.packService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackDto: UpdatePackDto) {
    return this.packService.update({ ...updatePackDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packService.remove(id);
  }
}
