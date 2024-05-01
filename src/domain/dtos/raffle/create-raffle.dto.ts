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
  metaTitle: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  metaDescription: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @ArrayMaxSize(5)
  @ApiProperty({ type: [String] })
  metaKeyword: string[];

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
  @ApiProperty({ type: Number, nullable: true, required: false })
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
  digits: number;
}
