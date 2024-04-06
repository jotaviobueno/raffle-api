import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateRaffleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  metaTitle: string;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  metaDescription: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @ArrayMaxSize(5)
  metaKeyword: string[];

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  isVisible: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsUUID()
  @IsNotEmpty()
  sellerId: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  minBuyQuotas: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  maxBuyQuotas: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(100_000_000)
  totalQuotas: number;

  @IsDate()
  @IsNotEmpty()
  drawDateAt: Date;
}
