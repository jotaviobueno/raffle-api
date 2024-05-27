import { ApiProperty } from '@nestjs/swagger';
import { QueryParamsDto } from '../shared';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class SearchSellerDto extends QueryParamsDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  name?: string;

  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  userId?: string;
}
