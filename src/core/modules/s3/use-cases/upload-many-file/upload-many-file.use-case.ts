import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCaseBase } from 'src/common/base';
import { UploadFileDto } from 'src/domain/dtos';
import { UploadSingleFileUseCase } from '../upload-single-file';

@Injectable()
export class UploadManyFileUseCase
  implements UseCaseBase<UploadFileDto[], string[]>
{
  constructor(
    private readonly uploadSingleFileUseCase: UploadSingleFileUseCase,
  ) {}

  execute(data: UploadFileDto[]): Promise<string[]> {
    try {
      return Promise.all(
        data.map(async ({ file, path }) => {
          return this.uploadSingleFileUseCase.execute({
            file,
            path,
          });
        }),
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
