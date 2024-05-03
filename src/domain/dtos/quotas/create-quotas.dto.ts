import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID, Max } from 'class-validator';

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
  // @Max(100_000)
  @IsNotEmpty()
  quantity: number;
}
