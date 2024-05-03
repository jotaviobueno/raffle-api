import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  street: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: Boolean })
  reference?: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ nullable: true, required: false })
  isDefault: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  complement?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  neighborhood: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  countryId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  stateId: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  userId?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  postcode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  number: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  sellerId?: string;
}
