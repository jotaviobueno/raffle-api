import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusEntity } from '../order-status';
import { OrderHistoryEntity } from './order-history.entity';

export class OrderHistoryWithRelationsEntity extends OrderHistoryEntity {
  @ApiProperty({ type: OrderStatusEntity })
  orderStatus: OrderStatusEntity;
}
