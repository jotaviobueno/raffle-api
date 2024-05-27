import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchWinnerDto extends QueryParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ nullable: true, required: false })
  number?: string;

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
}
