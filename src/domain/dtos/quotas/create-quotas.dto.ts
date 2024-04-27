import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateQuotasDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  raffleId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  customerId: string;
}
