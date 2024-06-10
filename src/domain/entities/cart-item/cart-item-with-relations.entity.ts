import { ApiProperty } from '@nestjs/swagger';
import { RaffleEntity } from '../raffle';
import { CartItemEntity } from './cart-item.entity';
import { PlanWithRelationsEntity } from '../plan';

export class CartItemWithRelationsEntity extends CartItemEntity {
  @ApiProperty({ type: RaffleEntity })
  raffle?: RaffleEntity;

  @ApiProperty({ type: PlanWithRelationsEntity })
  plan?: PlanWithRelationsEntity;
}
