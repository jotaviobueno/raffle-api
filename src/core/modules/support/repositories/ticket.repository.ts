import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateTicketDto, UpdateTicketDto } from 'src/domain/dtos';
import {
  QueryBuilderEntity,
  TicketEntity,
  TicketWithRelationsEntity,
} from 'src/domain/entities';

@Injectable()
export class TicketRepository extends RepositoryFactory<
  TicketEntity,
  CreateTicketDto,
  UpdateTicketDto
> {
  constructor() {
    super('ticket');
  }

  findById(id: string): Promise<TicketWithRelationsEntity | null> {
    return this.prismaService.ticket.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        ticketHistories: {
          include: { ticketStatus: true },
        },
        ticketStatus: true,
      },
    });
  }

  findAll(query: QueryBuilderEntity): Promise<TicketWithRelationsEntity[]> {
    return this.prismaService.ticket.findMany({
      ...query,
      include: {
        ticketHistories: {
          include: { ticketStatus: true },
        },
        ticketStatus: true,
      },
    });
  }
}
