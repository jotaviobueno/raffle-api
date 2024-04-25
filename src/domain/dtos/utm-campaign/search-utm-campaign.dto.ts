import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { QueryParamsDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class SearchUtmCampaignDto extends QueryParamsDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({ nullable: true })
  sellerId?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  description?: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @ApiProperty({ type: Date, nullable: true })
  from?: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  @ApiProperty({ type: Date, nullable: true })
  to?: Date;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean, nullable: true })
  isActive?: boolean;
}
