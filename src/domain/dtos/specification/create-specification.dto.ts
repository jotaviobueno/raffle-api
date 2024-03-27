import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSpecificationDto {
  @IsString()
  @IsNotEmpty()
  buildingArea: string;

  @IsString()
  @IsNotEmpty()
  totalArea: string;

  @IsBoolean()
  @IsNotEmpty()
  isFurnished: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isBuilding: boolean;

  @IsString()
  @IsOptional()
  buildingContext?: string;

  @IsBoolean()
  @IsNotEmpty()
  isAcceptExchange: boolean;

  @IsString()
  @IsOptional()
  exchangeContext?: string;

  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  locations: string[];
}
