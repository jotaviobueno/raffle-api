import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateQuotasDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  raffleId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  customerId: string;

  @IsInt()
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  quantity: number;
}
