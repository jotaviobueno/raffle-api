import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethodEntity } from './payment-method.entity';
import { GatewayEntity } from '../gateway';

export class PaymentMethodWithRelationsEntity extends PaymentMethodEntity {
  @ApiProperty({ type: GatewayEntity })
  gateway: GatewayEntity;
}
