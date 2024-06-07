import { ApiProperty } from '@nestjs/swagger';
import { AddressWithRelationsEntity } from '../address';
import { OrderBankSlipEntity } from '../order-bank-slip';
import { OrderCreditCardEntity } from '../order-credit-card';
import { OrderPixEntity } from '../order-pix';
import { PaymentMethodWithRelationsEntity } from '../payment-method';
import { OrderPaymentEntity } from './order-payment.entity';

export class OrderPaymentWithRelations extends OrderPaymentEntity {
  @ApiProperty({ type: PaymentMethodWithRelationsEntity })
  paymentMethod: PaymentMethodWithRelationsEntity;

  @ApiProperty({ type: AddressWithRelationsEntity })
  address: AddressWithRelationsEntity;

  @ApiProperty({ type: OrderBankSlipEntity, nullable: true })
  orderBankSlip?: OrderBankSlipEntity;

  @ApiProperty({ type: OrderCreditCardEntity, nullable: true })
  orderCreditCard?: OrderCreditCardEntity;

  @ApiProperty({ type: OrderPixEntity, nullable: true })
  orderPix?: OrderPixEntity;
}
