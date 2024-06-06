import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
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
    // return this.fileService.create({ ...createFileDto, files });

    return [
      {
        fieldname: 'files',
        originalname: 'Captura de tela 2024-06-02 023248 - Copia.png',
        encoding: '7bit',
        mimetype: 'image/png',
        buffer: {
          type: 'Buffer',
        },
        size: 16630,
        path: 'https://aladin-loterias.s3.sa-east-1.amazonaws.com/files/a36d4ee0-9151-4e11-97af-22213ee4d866.png',
      },
      {
        fieldname: 'files',
        originalname: 'Captura de tela 2024-06-02 023248.png',
        encoding: '7bit',
        mimetype: 'image/png',
        buffer: {
          type: 'Buffer',
        },
        size: 16630,
        path: 'https://aladin-loterias.s3.sa-east-1.amazonaws.com/files/1710ff5f-c76c-4717-80d7-3052e523a49e.png',
      },
    ];
  }
}
