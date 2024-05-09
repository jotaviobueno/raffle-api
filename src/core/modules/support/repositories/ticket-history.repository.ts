import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateTicketHistoryDto } from 'src/domain/dtos';
import { TicketHistoryEntity } from 'src/domain/entities';

@Injectable()
export class TicketHistoryRepository extends RepositoryFactory<
  TicketHistoryEntity,
  CreateTicketHistoryDto
> {
  constructor() {
    super('ticketHistory');
  }
}
