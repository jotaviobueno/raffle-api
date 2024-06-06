import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsSort } from 'src/common/validators';

export class QueryParamsDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  @Transform(({ value }) => +value)
  page: number = 1;

  @IsNumber()
  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  @Transform(({ value }) => +value)
  pageSize: number = 10;

  @IsString()
  @IsOptional()
  @IsSort()
  @ApiProperty({ nullable: true, required: false })
  orderBy?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ nullable: true, required: false })
  from?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ nullable: true, required: false })
  to?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @ApiProperty({ nullable: true, required: false })
  cache: boolean = true;

  @IsOptional()
  @IsString()
  @ApiProperty({ nullable: true, required: false })
  language: 'pt-BR' | 'en-US' = 'en-US';
}
