import { IsOptional, IsString, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchCategoryDto extends QueryParamsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  sellerId?: string;
}
