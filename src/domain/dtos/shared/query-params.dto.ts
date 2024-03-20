import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class QueryParamsDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ nullable: true })
  @Transform(({ value }) => +value)
  page: number = 1;

  @IsNumber()
  @ApiProperty({ nullable: true })
  @IsOptional()
  @Transform(({ value }) => +value)
  pageSize: number = 200;
}
