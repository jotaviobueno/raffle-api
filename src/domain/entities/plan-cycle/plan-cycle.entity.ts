import { ApiProperty } from '@nestjs/swagger';
import { PlanCycle } from '@prisma/client';

export class PlanCycleEntity implements PlanCycle {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
