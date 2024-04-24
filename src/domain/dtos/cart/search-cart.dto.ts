import { IsOptional, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchCartDto extends QueryParamsDto {
  @IsUUID()
  @IsOptional()
  customerId?: string;
}
