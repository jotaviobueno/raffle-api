import { Module } from '@nestjs/common';
import { UploadManyFileUseCase, UploadSingleFileUseCase } from './use-cases';

export const s3ModuleMock = {
  providers: [UploadSingleFileUseCase, UploadManyFileUseCase],
  exports: [UploadSingleFileUseCase, UploadManyFileUseCase],
};

@Module(s3ModuleMock)
export class S3Module {}
