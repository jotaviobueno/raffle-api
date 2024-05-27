import { ApiProperty } from '@nestjs/swagger';
import { FinanceTotal } from '@prisma/client';

export class FinanceTotalEntity implements FinanceTotal {
  @ApiProperty()
  id: string;

  @ApiProperty()
  financeId: string;

  @ApiProperty({ type: Number })
  subtotal: number;

  @ApiProperty({ type: Number })
  discount: number;

  @ApiProperty({ type: Number })
  discountManual: number;

  @ApiProperty({ type: Number })
  shipping: number;

  @ApiProperty({ type: Number })
  fee: number;

  @ApiProperty({ type: Number })
  tax: number;

  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
