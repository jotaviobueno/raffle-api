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
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../../role/guards';
import { Roles } from '../../role/decorators';
import { ROLE_ENUM } from 'src/common/enums';
import { IsPublic } from '../../auth/decorators';
import { QuotasService } from '../services/quotas.service';

@Controller('quotas')
@ApiTags('quotas')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
export class QuotasController {
  constructor(private readonly quotasService: QuotasService) {}

  @Post()
  create(@Body() createQuotasDto: CreateQuotasDto) {
    return this.quotasService.create(createQuotasDto);
  }

  @Get()
  @IsPublic()
  findAll(@Query() queryParams: SearchQuotasDto) {
    return this.quotasService.findAll(queryParams);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotasService.remove(id);
  }
}
