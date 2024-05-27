import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';

export class SearchSocialMediaDto extends QueryParamsDto {
  @IsString()
  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsUUID()
  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  @IsNotEmpty()
  sellerId?: string;
}
