import { ApiProperty } from '@nestjs/swagger';
import { RaffleEntity } from '../raffle';
import { OrderItemEntity } from './order-item.entity';

export class OrderItemWithRelationsEntity extends OrderItemEntity {
  @ApiProperty({ type: RaffleEntity })
  raffle: RaffleEntity;
}
