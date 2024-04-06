import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRaffleCategoryDto {
  @IsUUID()
  @IsNotEmpty()
  raffleId: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
