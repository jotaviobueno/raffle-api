import { Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateTicketHistoryDto } from 'src/domain/dtos';
import { TicketHistoryEntity } from 'src/domain/entities';
import { TicketHistoryRepository } from '../repositories/ticket-history.repository';

@Injectable()
export class TicketHistoryService
  implements ServiceBase<TicketHistoryEntity, CreateTicketHistoryDto>
{
  constructor(
    private readonly ticketHistoryRepository: TicketHistoryRepository,
  ) {}

  async create(dto: CreateTicketHistoryDto): Promise<TicketHistoryEntity> {
    const ticketHistory = await this.ticketHistoryRepository.create(dto);

    return ticketHistory;
  }
}
