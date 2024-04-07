import { IsOptional, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchPackDto extends QueryParamsDto {
  @IsUUID()
  @IsOptional()
  raffleId?: string;

  @IsUUID()
  @IsOptional()
  sellerId?: string;
}
