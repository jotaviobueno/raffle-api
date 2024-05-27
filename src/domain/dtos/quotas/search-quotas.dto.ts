import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';

export class SearchQuotasDto extends QueryParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ nullable: true, required: false })
  raffleId?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ nullable: true, required: false })
  customerId?: string;

  @IsNumberString({ no_symbols: true })
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true })
  number?: string;
}
