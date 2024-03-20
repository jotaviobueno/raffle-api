import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsOptional()
  reference?: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsUUID()
  @IsNotEmpty()
  countryId: string;

  @IsUUID()
  @IsNotEmpty()
  stateId: string;

  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  postcode: string;

  @IsString()
  @IsNotEmpty()
  city: string;
}
