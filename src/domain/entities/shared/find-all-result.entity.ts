import { ApiProperty } from '@nestjs/swagger';
import { FindAllResultInfoEntity } from './find-all-result-info.entity';

export class FindAllResultEntity<T> {
  data: T[];

  @ApiProperty({ type: FindAllResultInfoEntity })
  info: FindAllResultInfoEntity;
}
