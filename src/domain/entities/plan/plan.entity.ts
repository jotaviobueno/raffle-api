import { ApiProperty } from '@nestjs/swagger';
import { Plan } from '@prisma/client';

export class PlanEntity implements Plan {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  shortDescription: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  planCycleId: string;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: Number })
  tax: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
