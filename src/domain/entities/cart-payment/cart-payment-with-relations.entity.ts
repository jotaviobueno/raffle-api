import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from '../address';
import { PaymentMethodEntity } from '../payment-method';
import { CartPaymentEntity } from './cart-payment.entity';

export class CartPaymentWithRelationsEntity extends CartPaymentEntity {
  @ApiProperty({ type: AddressEntity })
  address: AddressEntity;

  @ApiProperty({ type: PaymentMethodEntity })
  paymentMethod: PaymentMethodEntity;
}
