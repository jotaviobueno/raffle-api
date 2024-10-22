import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRaffleCategoryDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  raffleId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  categoryId: string;
}
