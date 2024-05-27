import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';

export class SearchCategoryDto extends QueryParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ nullable: true, required: false })
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ nullable: true, required: false })
  sellerId?: string;
}
