import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';

export class SearchPaymentMethodDto extends QueryParamsDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  code?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  instructions?: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ type: Boolean, nullable: true })
  isActive?: boolean;
}
