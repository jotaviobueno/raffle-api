import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';

export class SearchOrderStatusDto extends QueryParamsDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  code?: string;
}
