import { S3Client } from '@aws-sdk/client-s3';
import { environment } from 'src/config';

export abstract class S3Service {
  protected readonly s3Client = new S3Client({
    region: environment.AWS_S3_REGION,
    apiVersion: '2012-08-10',
    credentials: {
      accessKeyId: environment.AWS_ACCESS_ID,
      secretAccessKey: environment.AWS_ACCESS_SECRET,
    },
  });
}
