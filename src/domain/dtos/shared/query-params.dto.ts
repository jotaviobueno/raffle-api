import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
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
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;
}
