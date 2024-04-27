import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAwardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  raffleId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  sellerId: string;
}
