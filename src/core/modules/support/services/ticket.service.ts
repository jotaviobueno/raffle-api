import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateTicketDto,
  QueryParamsDto,
  UpdateTicketDto,
} from 'src/domain/dtos';
import {
  FindAllResultEntity,
  TicketEntity,
  TicketWithRelationsEntity,
} from 'src/domain/entities';
import { UserService } from '../../user/services/user.service';
import { TicketRepository } from '../repositories/ticket.repository';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';
import { TicketStatusService } from './ticket-status.service';
import { TicketHistoryService } from './ticket-history.service';

@Injectable()
export class TicketService
  implements ServiceBase<TicketEntity, CreateTicketDto, UpdateTicketDto>
{
  constructor(
    private readonly userService: UserService,
    private readonly ticketRepository: TicketRepository,
    private readonly ticketStatusService: TicketStatusService,
    private readonly ticketHistoryService: TicketHistoryService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateTicketDto): Promise<TicketEntity> {
    if (dto.customerId) await this.userService.findById(dto.customerId);

    const ticketStatus = await this.ticketStatusService.findById(
      dto.ticketStatusId,
    );

    const ticket = await this.ticketRepository.create(dto);

    await this.ticketHistoryService.create({
      code: ticketStatus.code,
      ticketId: ticket.id,
      ticketStatusId: ticketStatus.id,
    });

    return ticket;
  }

  async findAll(
    queryParams: QueryParamsDto,
  ): Promise<FindAllResultEntity<TicketWithRelationsEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<TicketWithRelationsEntity> | null>(
        `tickets_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams).sort().pagination().handle();

    const tickets = await this.ticketRepository.findAll(query);
    const total = await this.ticketRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`tickets_${queryParamsStringfy}`, {
      data: tickets,
      info,
    });

    return { data: tickets, info };
  }

  async findById(id: string): Promise<TicketWithRelationsEntity> {
    const ticket = await this.ticketRepository.findById(id);

    if (!ticket)
      throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);

    return ticket;
  }

  async update(dto: UpdateTicketDto): Promise<TicketEntity> {
    const ticket = await this.findById(dto.id);

    if (dto.ticketStatusId) {
      const ticketStatus = await this.ticketStatusService.findById(
        dto.ticketStatusId,
      );

      if (dto.ticketStatusId != ticket.ticketStatusId)
        await this.ticketHistoryService.create({
          code: ticketStatus.code,
          ticketId: ticket.id,
          ticketStatusId: ticketStatus.id,
        });
    }

    const update = await this.ticketRepository.softDelete(ticket.id);

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const ticket = await this.findById(id);

    const remove = await this.ticketRepository.softDelete(ticket.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
