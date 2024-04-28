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
  MaxFileSizeValidator,
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
import { ROLE_ENUM } from 'src/common/enums';
import { Roles } from '../../role/decorators';
import { RoleGuard } from '../../role/guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { SellerEntity } from '../../../../domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';

@Controller('seller')
@ApiTags('seller')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
@ApiBearerAuth('defaultBearerAuth')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
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
    required: false,
  })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  create(
    @Body() createSellerDto: CreateSellerDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10_000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.sellerService.create({ ...createSellerDto, file });
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  @ApiUnauthorizedResponse()
  @ApiOkFindAllResult(SellerEntity)
  findAll(@Query() queryParams: SearchSellerDto) {
    return this.sellerService.findAll(queryParams);
  }

  @Get(':id')
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: SellerEntity })
  findById(@Param('id') id: string) {
    return this.sellerService.findById(id);
  }

  @Patch(':id')
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
        validators: [
          new MaxFileSizeValidator({ maxSize: 10_000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.sellerService.update({ ...updateSellerDto, id, file });
  }

  @Delete(':id')
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @ApiNotAcceptableResponse()
  remove(@Param('id') id: string) {
    return this.sellerService.remove(id);
  }
}
