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
import { CreateMenuDto, QueryParamsDto } from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { IsPublic } from '../../auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { MenuService } from '../services/menu.service';
import { RoleGuard } from '../../role/guards';
import { Roles } from '../../role/decorators';
import { ROLE_ENUM } from 'src/common/enums';
import { UpdateMenuDto } from 'src/domain/dtos/menu/update-menu.dto';

@IsPublic()
@Controller('menu')
@ApiTags('menu')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @IsPublic()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.menuService.findAll(queryParams);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update({ ...updateMenuDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
