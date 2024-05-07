import { ApiProperty } from '@nestjs/swagger';
import { CouponEntity } from '../coupon';
import { OrderCouponEntity } from './order-coupon.entity';

export class OrderCouponWithRelationsEntity extends OrderCouponEntity {
  @ApiProperty({ type: CouponEntity })
  coupon: CouponEntity;
}
