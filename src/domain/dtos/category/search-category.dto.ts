import { IsOptional, IsString, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';

export class SearchCategoryDto extends QueryParamsDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ nullable: true, required: false })
  name?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({ nullable: true, required: false })
  sellerId?: string;
}
