import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateTicketDto, UpdateTicketDto } from 'src/domain/dtos';
import { QueryBuilderEntity, TicketEntity } from 'src/domain/entities';

@Injectable()
export class TicketRepository extends RepositoryFactory<
  TicketEntity,
  CreateTicketDto,
  UpdateTicketDto
> {
  constructor() {
    super('ticket');
  }

  findById(id: string): Promise<TicketEntity | null> {
    return this.prismaService.ticket.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll(query: QueryBuilderEntity): Promise<TicketEntity[]> {
    return this.prismaService.ticket.findMany(query);
  }
}
