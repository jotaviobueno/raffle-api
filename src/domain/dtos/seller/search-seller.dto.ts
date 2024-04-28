import { ApiProperty } from '@nestjs/swagger';
import { QueryParamsDto } from '../shared';
import { IsOptional, IsString } from 'class-validator';

export class SearchSellerDto extends QueryParamsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  name?: string;
}
