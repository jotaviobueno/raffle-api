import { FindAllResultInfoEntity } from './find-all-result-info.entity';

export class FindAllResultEntity<T> {
  data: T[];
  info: FindAllResultInfoEntity;
}
