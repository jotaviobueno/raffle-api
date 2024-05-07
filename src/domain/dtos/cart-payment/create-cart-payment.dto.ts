import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCartPaymentDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  cartId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  addressId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  paymentMethodId: string;
}
