import { ApiProperty } from '@nestjs/swagger';
import { Ticket } from '@prisma/client';

export class TicketEntity implements Ticket {
  @ApiProperty()
  id: string;

  @ApiProperty({ nullable: true })
  customerId: string | null;

  @ApiProperty({ nullable: true })
  email: string | null;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty()
  ticketStatusId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
