import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateRaffleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  price: number;

  @IsBoolean()
  @ApiProperty({ type: Boolean })
  @IsNotEmpty()
  isVisible: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @IsUUID()
  @ApiProperty()
  @IsNotEmpty()
  sellerId: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ type: Number })
  minBuyQuotas: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  tax?: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ type: Number })
  maxBuyQuotas: number;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ type: Date })
  drawDateAt: Date;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ type: Number })
  @Transform(({ value }) => +value)
  totalNumbers: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({ type: Number, nullable: true, required: false })
  @Transform(({ value }) => +value)
  initial?: number;

  @ApiProperty({ type: [String], nullable: true, required: false })
  @IsString({ each: true })
  @IsOptional()
  packages?: string[];

  @ApiProperty({ type: [String], nullable: true, required: false })
  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  filesIds: string[];
}
