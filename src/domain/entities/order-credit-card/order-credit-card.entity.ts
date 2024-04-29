import { ApiProperty } from '@nestjs/swagger';
import { OrderCreditCard } from '@prisma/client';

export class OrderCreditCardEntity implements OrderCreditCard {
  @ApiProperty()
  id: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: Number })
  expirationMonth: number;

  @ApiProperty({ type: Number })
  expirationYear: number;

  @ApiProperty({ type: Number })
  cvv: number;

  @ApiProperty({ nullable: true })
  token: string | null;

  @ApiProperty()
  orderPaymentId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
