import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
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
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('raffle')
@ApiTags('raffle')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
export class ProductController {
  constructor(private readonly raffleService: RaffleService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Body() createRaffleDto: CreateRaffleDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    files: Express.Multer.File[],
  ) {
    return this.raffleService.create({ ...createRaffleDto, files });
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
  @UseInterceptors(FilesInterceptor('files'))
  update(
    @Param('id') id: string,
    @Body() updateRaffleDto: UpdateRaffleDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    files: Express.Multer.File[],
  ) {
    return this.raffleService.update({ ...updateRaffleDto, id, files });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raffleService.remove(id);
  }
}
