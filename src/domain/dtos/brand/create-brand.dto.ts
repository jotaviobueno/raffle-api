import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBrandDto {
  @IsUUID()
  @IsNotEmpty()
  sellerId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
