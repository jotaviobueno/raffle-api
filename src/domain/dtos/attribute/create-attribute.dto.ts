import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAttributeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsUUID()
  @IsNotEmpty()
  sellerId: string;
}
