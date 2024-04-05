import { IsOptional, IsString } from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchRoleDto extends QueryParamsDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  code?: string;
}
