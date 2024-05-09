import { ApiProperty } from '@nestjs/swagger';
import { TicketStatusEntity } from '../ticket-status';
import { TicketHistoryEntity } from './ticket-history.entity';

export class TicketHistoryWithRelationsEntity extends TicketHistoryEntity {
  @ApiProperty({ type: TicketStatusEntity, nullable: true })
  ticketStatus: TicketStatusEntity;
}
