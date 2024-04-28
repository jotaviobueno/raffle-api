import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchCouponDto extends QueryParamsDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  code?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean, nullable: true })
  isActive?: boolean;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  utmCampaignId?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: Date, nullable: true })
  from?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: Date, nullable: true })
  to?: Date;
}
