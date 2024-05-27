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
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
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
  ApiConsumes,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { SellerEntity } from '../../../../domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';
import { IsPublic } from '../../auth/decorators';

@Controller('seller')
@ApiTags('seller')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
@ApiBearerAuth('defaultBearerAuth')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_CREATE_SELLER)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: SellerEntity })
  @ApiBody({
    type: CreateSellerDto,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        media: {
          type: 'string',
          format: 'binary',
        },
      },
    },
    required: true,
  })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  create(
    @Body() createSellerDto: CreateSellerDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.sellerService.create({ ...createSellerDto, file });
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
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: SellerEntity })
  @ApiBody({
    type: UpdateSellerDto,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        media: {
          type: 'string',
          format: 'binary',
        },
      },
    },
    required: false,
  })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiNotAcceptableResponse()
  update(
    @Param('id') id: string,
    @Body() updateSellerDto: UpdateSellerDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.sellerService.update({ ...updateSellerDto, id, file });
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
