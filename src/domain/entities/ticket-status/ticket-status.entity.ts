import { ApiProperty } from '@nestjs/swagger';
import { TicketStatus } from '@prisma/client';

export class TicketStatusEntity implements TicketStatus {
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
