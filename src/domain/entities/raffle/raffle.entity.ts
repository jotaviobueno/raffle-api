import { ApiProperty } from '@nestjs/swagger';
import { Raffle } from '@prisma/client';

export class RaffleEntity implements Raffle {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  metaTitle: string;

  @ApiProperty()
  shortDescription: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty()
  metaDescription: string;

  @ApiProperty({ type: [String] })
  metaKeyword: string[];

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: Boolean })
  isVisible: boolean;

  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @ApiProperty()
  sellerId: string;

  @ApiProperty({ type: Number })
  minBuyQuotas: number;

  @ApiProperty({ type: Number })
  maxBuyQuotas: number;

  @ApiProperty({ type: Number })
  totalQuotas: number;

  @ApiProperty({ type: Number })
  freePercentage: number;

  @ApiProperty({ type: Number })
  payeds: number;

  @ApiProperty({ type: Number })
  digits: number;

  @ApiProperty({ type: Number })
  initial: number;

  @ApiProperty({ type: Number })
  final: number;

  @ApiProperty({ type: Number })
  totalNumbers: number;

  @ApiProperty({ type: Date })
  drawDateAt: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
