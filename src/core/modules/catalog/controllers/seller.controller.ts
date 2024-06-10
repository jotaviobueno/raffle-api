import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import {
  CreateSellerDto,
  SearchSellerDto,
  UpdateSellerDto,
} from 'src/domain/dtos';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { SellerService } from '../services/seller.service';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/common/enums';
import { Permissions, Roles } from '../../role/decorators';
import { RoleGuard } from '../../role/guards';
import { SellerEntity } from '../../../../domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';
import { IsPublic } from '../../auth/decorators';

@Controller('seller')
@ApiTags('seller')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN)
@ApiBearerAuth('defaultBearerAuth')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_CREATE_SELLER)
  @ApiCreatedResponse({ type: SellerEntity })
  @ApiBody({
    type: CreateSellerDto,
  })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellerService.create(createSellerDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @ApiUnauthorizedResponse()
  @Permissions(PERMISSION_ENUM.CAN_READ_SELLER)
  @ApiOkFindAllResult(SellerEntity)
  findAll(@Query() queryParams: SearchSellerDto) {
    return this.sellerService.findAll(queryParams);
  }

  @Get(':id')
  @Permissions(PERMISSION_ENUM.CAN_READ_SELLER)
  @ApiUnauthorizedResponse()
  @IsPublic()
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: SellerEntity })
  findById(@Param('id') id: string) {
    return this.sellerService.findByIdAndPopulate(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_SELLER)
  @ApiCreatedResponse({ type: SellerEntity })
  @ApiBody({
    type: UpdateSellerDto,
  })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiNotAcceptableResponse()
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.update({ ...updateSellerDto, id });
  }

  @Delete(':id')
  @Permissions(PERMISSION_ENUM.CAN_DELETE_SELLER)
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @ApiNotAcceptableResponse()
  remove(@Param('id') id: string) {
    return this.sellerService.remove(id);
  }
}
