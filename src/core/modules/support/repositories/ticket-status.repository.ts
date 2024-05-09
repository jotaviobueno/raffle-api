import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateTicketStatusDto, UpdateTicketStatusDto } from 'src/domain/dtos';
import { QueryBuilderEntity, TicketStatusEntity } from 'src/domain/entities';

@Injectable()
export class TicketStatusRepository extends RepositoryFactory<
  TicketStatusEntity,
  CreateTicketStatusDto,
  UpdateTicketStatusDto
> {
  constructor() {
    super('ticketStatus');
  }

  findById(id: string): Promise<TicketStatusEntity | null> {
    return this.prismaService.ticketStatus.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll(query: QueryBuilderEntity): Promise<TicketStatusEntity[]> {
    return this.prismaService.ticketStatus.findMany(query);
  }
}
