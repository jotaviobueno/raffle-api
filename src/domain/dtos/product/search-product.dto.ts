import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { Transform } from 'class-transformer';

export class SearchProductDto extends QueryParamsDto {
  @IsUUID()
  @IsOptional()
  sellerId?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isActive?: boolean[];

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isVisible?: boolean;
}
