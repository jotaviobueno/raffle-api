import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCartCouponDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  cartId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;
}
