import { ApiProperty } from '@nestjs/swagger';
import { RaffleEntity } from '../raffle';
import { CartItemEntity } from './cart-item.entity';

export class CartItemWithRelationsEntity extends CartItemEntity {
  @ApiProperty({ type: RaffleEntity })
  raffle: RaffleEntity;
}
