import { IsOptional, IsString, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchAttributeDto extends QueryParamsDto {
  @IsUUID()
  @IsOptional()
  sellerId?: string;

  @IsString()
  @IsOptional()
  name?: string;
}
