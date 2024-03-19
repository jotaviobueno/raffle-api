import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';

export const s3ModuleMock = {
  providers: [S3Service],
  exports: [S3Service],
};

@Module(s3ModuleMock)
export class S3Module {}
