import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';

export class SearchPaymentMethodDto extends QueryParamsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  code?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  instructions?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: () => Boolean, nullable: true })
  isActive?: boolean;
}
