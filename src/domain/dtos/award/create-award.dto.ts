import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAwardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  raffleId: string;

  @IsUUID()
  @IsNotEmpty()
  sellerId: string;
}
