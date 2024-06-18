import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateCartItemDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ type: Number })
  quantity: number;

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  raffleId?: string;

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  planId?: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  cartId: string;

  total: number;
  price: number;
}
