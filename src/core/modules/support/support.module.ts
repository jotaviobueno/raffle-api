import { Module } from '@nestjs/common';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket.service';
import { TicketRepository } from './repositories/ticket.repository';
import { UserModule } from '../user/user.module';
import { TicketStatusController } from './controllers/ticket-status.controller';
import { TicketStatusService } from './services/ticket-status.service';
import { TicketStatusRepository } from './repositories/ticket-status.repository';
import { TicketHistoryRepository } from './repositories/ticket-history.repository';
import { TicketHistoryService } from './services/ticket-history.service';

@Module({
  imports: [UserModule],
  controllers: [TicketController, TicketStatusController],
  providers: [
    TicketService,
    TicketRepository,
    TicketStatusService,
    TicketStatusRepository,
    TicketHistoryService,
    TicketHistoryRepository,
  ],
  exports: [TicketService, TicketStatusService, TicketHistoryService],
})
export class SupportModule {}
