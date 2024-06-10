import { ApiProperty } from '@nestjs/swagger';
import { RaffleEntity } from '../raffle';
import { OrderItemEntity } from './order-item.entity';
import { PlanWithRelationsEntity } from '../plan';

export class OrderItemWithRelationsEntity extends OrderItemEntity {
  @ApiProperty({ type: RaffleEntity, nullable: true })
  raffle?: RaffleEntity;

  @ApiProperty({ type: PlanWithRelationsEntity, nullable: true })
  plan?: PlanWithRelationsEntity;
}
