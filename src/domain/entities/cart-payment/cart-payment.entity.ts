import { ApiProperty } from '@nestjs/swagger';
import { CartPayment } from '@prisma/client';

export class CartPaymentEntity implements CartPayment {
  @ApiProperty()
  id: string;

  @ApiProperty()
  method: string;

  @ApiProperty()
  paymentMethodId: string;

  @ApiProperty()
  addressId: string;

  @ApiProperty()
  cartId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
