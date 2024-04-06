import { IsNotEmpty, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchPackDto extends QueryParamsDto {
  @IsUUID()
  @IsNotEmpty()
  raffleId?: string;

  @IsUUID()
  @IsNotEmpty()
  sellerId?: string;
}
