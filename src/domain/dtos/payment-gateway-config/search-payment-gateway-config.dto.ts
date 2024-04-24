import { IsOptional, IsString } from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchPaymentGatewayConfigDto extends QueryParamsDto {
  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  name?: string;
}
