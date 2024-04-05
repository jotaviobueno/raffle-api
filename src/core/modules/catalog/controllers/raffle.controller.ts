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
  CreateRaffleDto,
  SearchRaffleDto,
  UpdateRaffleDto,
} from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';
import { RaffleService } from '../services/raffle.service';
import { IsPublic } from '../../auth/decorators';
import { Roles } from '../../role/decorators';
import { ROLE_ENUM } from 'src/common/enums';
import { RoleGuard } from '../../role/guards';

@Controller('raffle')
@ApiTags('raffle')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
export class ProductController {
  constructor(private readonly raffleService: RaffleService) {}

  @Post()
  create(@Body() createRaffleDto: CreateRaffleDto) {
    return this.raffleService.create(createRaffleDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  @IsPublic()
  findAll(@Query() queryParams: SearchRaffleDto) {
    return this.raffleService.findAll(queryParams);
  }

  @Get(':id')
  @IsPublic()
  findById(@Param('id') id: string) {
    return this.raffleService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaffleDto: UpdateRaffleDto) {
    return this.raffleService.update({ ...updateRaffleDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raffleService.remove(id);
  }
}
