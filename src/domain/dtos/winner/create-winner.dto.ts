import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsUUID } from 'class-validator';

export class CreateWinnerDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  raffleId: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  number: string;
}
