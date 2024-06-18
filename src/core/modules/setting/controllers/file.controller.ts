import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { IsPublic } from '../../auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { CreateFileDto } from 'src/domain/dtos';
import { FileService } from '../services/file.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@IsPublic()
@Controller('file')
@ApiTags('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  uploadManyFiles(
    @Body() createFileDto: CreateFileDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: true,
      }),
    )
    files: Express.Multer.File[],
  ) {
    return this.fileService.create({ ...createFileDto, files });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(id);
  }
}
