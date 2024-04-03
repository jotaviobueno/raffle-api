import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsString()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  sellerId: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
