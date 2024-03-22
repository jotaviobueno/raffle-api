import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  metaTitle: string;

  @IsString()
  @IsNotEmpty()
  metaDescription: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  metaKeyword: string[];

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsBoolean()
  @IsOptional()
  isVisible: boolean;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsUUID()
  @IsNotEmpty()
  sellerId: string;

  @IsUUID()
  @IsOptional()
  brandId?: string;
}
