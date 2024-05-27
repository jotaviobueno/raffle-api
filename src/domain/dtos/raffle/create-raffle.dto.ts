import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
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

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @ArrayMaxSize(5)
  @ApiProperty({ type: [String] })
  metaKeyword: string[];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  @Transform(({ value }) => +value)
  price: number;

  @IsBoolean()
  @ApiProperty({ type: Boolean })
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  isVisible: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ type: Boolean })
  @Transform(({ value }) => value === 'true')
  isActive: boolean;

  @IsUUID()
  @ApiProperty()
  @IsNotEmpty()
  sellerId: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ type: Number })
  @Transform(({ value }) => +value)
  minBuyQuotas: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, nullable: true, required: false })
  @Transform(({ value }) => +value)
  tax?: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ type: Number })
  @Transform(({ value }) => +value)
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

  @ApiProperty({ type: [Number], nullable: true, required: false })
  @IsInt({ each: true })
  @IsOptional()
  quantity?: number[];
}
