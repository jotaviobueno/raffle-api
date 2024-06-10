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
  CreateCategoryDto,
  SearchCategoryDto,
  UpdateCategoryDto,
} from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators';
import { CategoryService } from '../services/category.service';
import { RoleGuard } from '../../role/guards';
import { Permissions, Roles } from '../../role/decorators';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/common/enums';
import { CategoryEntity } from 'src/domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';

@Controller('category')
@ApiTags('category')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN)
@ApiBearerAuth('defaultBearerAuth')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_CREATE_CATEGORY)
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiUnauthorizedResponse()
  @ApiBody({ type: CreateCategoryDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @IsPublic()
  @ApiOkFindAllResult(CategoryEntity)
  findAll(@Query() queryParams: SearchCategoryDto) {
    return this.categoryService.findAll(queryParams);
  }

  @Get(':id')
  @IsPublic()
  @ApiOkResponse({ type: CategoryEntity })
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  findById(@Param('id') id: string) {
    return this.categoryService.findById(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_CATEGORY)
  @ApiOkResponse({ type: CategoryEntity })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update({ ...updateCategoryDto, id });
  }

  @Delete(':id')
  @Permissions(PERMISSION_ENUM.CAN_DELETE_CATEGORY)
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
