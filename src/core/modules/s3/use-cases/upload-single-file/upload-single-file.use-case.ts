import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { environment } from 'src/config';
import { UseCaseBase } from 'src/common/base';
import { UploadFileDto } from 'src/domain/dtos';
import { S3Service } from '../../s3.service';
import { PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class UploadSingleFileUseCase
  extends S3Service
  implements UseCaseBase<UploadFileDto, string>
{
  async execute(data: UploadFileDto): Promise<string> {
    try {
      const url = `${data.path}/${randomUUID()}.${data.file.mimetype.split('/')[1]}`;

      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: environment.AWS_S3_BUCKET,
          Key: url,
          Body: data.file.buffer,
          ACL: 'public-read',
          ContentType: data.file.mimetype,
        }),
      );

      return `https://${environment.AWS_S3_BUCKET}.s3.${environment.AWS_S3_REGION}.amazonaws.com/${url}`;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
