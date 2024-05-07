import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateUtmCampaignDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  sellerId: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
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
  @IsNotEmpty()
  @ApiProperty({ type: Boolean })
  isActive: boolean;
}
