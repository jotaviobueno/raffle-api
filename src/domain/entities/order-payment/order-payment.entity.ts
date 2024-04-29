import { ApiProperty } from '@nestjs/swagger';
import { OrderPayment } from '@prisma/client';

export class OrderPaymentEntity implements OrderPayment {
  @ApiProperty()
  id: string;

  @ApiProperty({ nullable: true })
  gatewayPamentId: string | null;

  @ApiProperty({ nullable: true })
  status: string | null;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  method: string;

  @ApiProperty()
  paymentMethodId: string;

  @ApiProperty({ nullable: true })
  receiptUrl: string | null;

  @ApiProperty()
  invoiceUrl: string;

  @ApiProperty()
  addressId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
