import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateCondominiumDto,
  SearchCondominiumDto,
  UpdateCondominiumDto,
} from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators';
import { CondominiumService } from '../services/condominium.service';

@Controller('condominium')
@ApiTags('condominium')
export class CondominiumController {
  constructor(private readonly condominiumService: CondominiumService) {}

  @Post()
  create(@Body() createCondominiumDto: CreateCondominiumDto) {
    return this.condominiumService.create(createCondominiumDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  findAll(@Query() queryParams: SearchCondominiumDto) {
    return this.condominiumService.findAll(queryParams);
  }

  @Get(':id')
  @IsPublic()
  findAllCountryId(@Param('id') id: string) {
    return this.condominiumService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCondominiumDto: UpdateCondominiumDto,
  ) {
    return this.condominiumService.update({ ...updateCondominiumDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.condominiumService.remove(id);
  }
}
