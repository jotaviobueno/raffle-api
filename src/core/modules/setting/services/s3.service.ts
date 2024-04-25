import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { environment } from 'src/config';
import { UploadFileDto } from 'src/domain/dtos';

@Injectable()
export class S3Service {
  protected readonly s3Client = new S3Client({
    region: environment.AWS_S3_REGION,
    apiVersion: '2012-08-10',
    credentials: {
      accessKeyId: environment.AWS_ACCESS_ID,
      secretAccessKey: environment.AWS_ACCESS_SECRET,
    },
  });

  async singleFile(data: UploadFileDto): Promise<string> {
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

  manyFiles(data: UploadFileDto[]): Promise<string[]> {
    try {
      return Promise.all(
        data.map(async ({ file, path }) => {
          return this.singleFile({
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
