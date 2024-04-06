import { IsOptional, IsString, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchAwardDto extends QueryParamsDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsUUID()
  @IsOptional()
  raffleId?: string;

  @IsUUID()
  @IsOptional()
  sellerId?: string;
}
