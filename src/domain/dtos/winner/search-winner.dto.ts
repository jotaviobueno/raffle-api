import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchWinnerDto extends QueryParamsDto {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ nullable: true, required: false })
  number?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({ nullable: true, required: false })
  raffleId?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({ nullable: true, required: false })
  customerId?: string;
}
