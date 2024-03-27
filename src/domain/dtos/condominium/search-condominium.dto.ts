import { IsOptional, IsString, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchCondominiumDto extends QueryParamsDto {
  @IsUUID()
  @IsOptional()
  sellerId?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
