import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CreateCartItemDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ type: Number })
  quantity: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  raffleId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  cartId: string;
}
