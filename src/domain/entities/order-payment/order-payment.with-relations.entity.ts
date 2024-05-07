import { ApiProperty } from '@nestjs/swagger';
import { AddressEntity } from '../address';
import { OrderBankSlipEntity } from '../order-bank-slip';
import { OrderCreditCardEntity } from '../order-credit-card';
import { OrderPixEntity } from '../order-pix';
import { PaymentMethodEntity } from '../payment-method';
import { OrderPaymentEntity } from './order-payment.entity';

export class OrderPaymentWithRelations extends OrderPaymentEntity {
  @ApiProperty({ type: PaymentMethodEntity })
  paymentMethod: PaymentMethodEntity;

  @ApiProperty({ type: AddressEntity })
  address: AddressEntity;

  @ApiProperty({ type: OrderBankSlipEntity, nullable: true })
  orderBankSlip?: OrderBankSlipEntity;

  @ApiProperty({ type: OrderCreditCardEntity, nullable: true })
  orderCreditCard?: OrderCreditCardEntity;

  @ApiProperty({ type: OrderPixEntity, nullable: true })
  orderPix?: OrderPixEntity;
}
