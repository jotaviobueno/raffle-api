import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';

export class SearchPaymentMethodDto extends QueryParamsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  code?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  instructions?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean, nullable: true })
  isActive?: boolean;
}
