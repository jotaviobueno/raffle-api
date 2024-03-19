import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, QueryParamsDto, UpdateUserDto } from 'src/domain/dtos';
import {
  CreateUserUseCase,
  FindAllUserUseCase,
  FindByIdUserUseCase,
  SoftDeleteUserUseCase,
  UpdateUserUseCase,
} from './use-cases';
import { FileInterceptor } from '@nestjs/platform-express';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUserUseCase: FindAllUserUseCase,
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
    private readonly softDeleteUserUseCase: SoftDeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'jpg|webp|png|jpeg' }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.createUserUseCase.execute({ ...createUserDto, file });
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.findAllUserUseCase.execute(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findByIdUserUseCase.execute(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'jpg|webp|png|jpeg' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.updateUserUseCase.execute({ ...updateUserDto, id, file });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.softDeleteUserUseCase.execute(id);
  }
}
