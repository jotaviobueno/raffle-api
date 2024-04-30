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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
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
import { RaffleCategoryService } from '../services/raffle-category.service';
import { RaffleCategoryEntity } from 'src/domain/entities';

@Controller('raffle-category')
@ApiTags('raffle-category')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
@ApiBearerAuth('defaultBearerAuth')
export class RaffleCategoryController {
  constructor(private readonly raffleCategoryService: RaffleCategoryService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_CREATE_RAFFLE_CATEGORY)
  @ApiCreatedResponse({ type: RaffleCategoryEntity })
  @ApiBody({ type: CreateRaffleCategoryDto })
  @ApiNotFoundResponse()
  @ApiConflictResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  create(@Body() createRaffleCategoryDto: CreateRaffleCategoryDto) {
    return this.raffleCategoryService.create(createRaffleCategoryDto);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_RAFFLE_CATEGORY)
  @ApiOkResponse({ type: RaffleCategoryEntity })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiNotFoundResponse()
  @ApiConflictResponse()
  @ApiUnauthorizedResponse()
  @ApiNotAcceptableResponse()
  @ApiBadRequestResponse()
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.raffleCategoryService.update({ ...updateCategoryDto, id });
  }

  @Delete(':id')
  @Permissions(PERMISSION_ENUM.CAN_DELETE_RAFFLE_CATEGORY)
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  remove(@Param('id') id: string) {
    return this.raffleCategoryService.remove(id);
  }
}
