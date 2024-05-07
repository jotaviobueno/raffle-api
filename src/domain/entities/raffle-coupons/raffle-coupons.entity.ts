import { ApiProperty } from '@nestjs/swagger';
import { RaffleCoupon } from '@prisma/client';

export class RaffleCouponsEntity implements RaffleCoupon {
  @ApiProperty()
  id: string;

  @ApiProperty()
  raffleId: string;

  @ApiProperty()
  couponId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
