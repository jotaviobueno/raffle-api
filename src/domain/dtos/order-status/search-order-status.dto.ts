import { IsOptional, IsString } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';

export class SearchOrderStatusDto extends QueryParamsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  name?: string;
}
