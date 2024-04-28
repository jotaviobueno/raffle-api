import { ApiProperty } from '@nestjs/swagger';
import { OrderPix } from '@prisma/client';

export class OrderPixEntity implements OrderPix {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderPaymentId: string;

  @ApiProperty()
  copyPaste: string;

  @ApiProperty()
  image: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;

  @ApiProperty({ type: Date })
  expiratAt: Date;
}
