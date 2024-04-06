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
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import {
  CreateSellerDto,
  QueryParamsDto,
  UpdateSellerDto,
} from 'src/domain/dtos';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { SellerService } from '../services/seller.service';
import { ROLE_ENUM } from 'src/common/enums';
import { Roles } from '../../role/decorators';
import { RoleGuard } from '../../role/guards';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('seller')
@ApiTags('seller')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'favicon', maxCount: 1 },
      { name: 'logo', maxCount: 1 },
    ]),
  )
  create(
    @Body() createSellerDto: CreateSellerDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|svg)' }),
        ],
        fileIsRequired: true,
      }),
    )
    files: {
      favicon: Express.Multer.File[];
      logo: Express.Multer.File[];
    },
  ) {
    return this.sellerService.create({ ...createSellerDto, files });
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.sellerService.findAll(queryParams);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.sellerService.findById(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'favicon', maxCount: 1 },
      { name: 'logo', maxCount: 1 },
    ]),
  )
  update(
    @Param('id') id: string,
    @Body() updateSellerDto: UpdateSellerDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|svg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    files: {
      favicon: Express.Multer.File[];
      logo: Express.Multer.File[];
    },
  ) {
    return this.sellerService.update({ ...updateSellerDto, id, files });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerService.remove(id);
  }
}
