import { IsInt, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreatePackDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsUUID()
  @IsNotEmpty()
  raffleId: string;

  @IsUUID()
  @IsNotEmpty()
  sellerId: string;
}
