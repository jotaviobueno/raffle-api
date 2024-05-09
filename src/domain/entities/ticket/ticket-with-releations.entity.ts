import { ApiProperty } from '@nestjs/swagger';
import { TicketStatusEntity } from '../ticket-status';
import { TicketEntity } from './ticket.entity';
import { TicketHistoryWithRelationsEntity } from '../ticket-history';

export class TicketWithRelationsEntity extends TicketEntity {
  @ApiProperty({ type: [TicketHistoryWithRelationsEntity] })
  ticketHistories: TicketHistoryWithRelationsEntity[];

  @ApiProperty({ type: TicketStatusEntity, nullable: true })
  ticketStatus: TicketStatusEntity;
}
