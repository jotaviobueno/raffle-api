import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, nullable: true })
  discount?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, nullable: true })
  shipping?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, nullable: true })
  maxUsages?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, nullable: true })
  maxUsagesPerUser?: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  utmCampaignId: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: Date, nullable: true })
  from?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: Date, nullable: true })
  to?: Date;
}
