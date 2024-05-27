import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { QueryParamsDto } from '../shared';

export class SearchCouponDto extends QueryParamsDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  code?: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ type: Boolean, nullable: true })
  isActive?: boolean;

  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  utmCampaignId?: string;
}
