import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCondominiumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  sellerId: string;
}
