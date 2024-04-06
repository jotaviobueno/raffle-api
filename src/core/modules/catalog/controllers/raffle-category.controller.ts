import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateRaffleCategoryDto, UpdateCategoryDto } from 'src/domain/dtos';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../../role/guards';
import { Roles } from '../../role/decorators';
import { ROLE_ENUM } from 'src/common/enums';
import { RaffleCategoryService } from '../services/raffle-category.service';

@Controller('raffle-category')
@ApiTags('raffle-category')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
export class RaffleCategoryController {
  constructor(private readonly raffleCategoryService: RaffleCategoryService) {}

  @Post()
  create(@Body() createRaffleCategoryDto: CreateRaffleCategoryDto) {
    return this.raffleCategoryService.create(createRaffleCategoryDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.raffleCategoryService.update({ ...updateCategoryDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raffleCategoryService.remove(id);
  }
}
