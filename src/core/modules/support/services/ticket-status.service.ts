import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateTicketStatusDto,
  SearchTicketStatusDto,
  UpdateTicketStatusDto,
} from 'src/domain/dtos';
import { FindAllResultEntity, TicketStatusEntity } from 'src/domain/entities';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { TicketStatusRepository } from '../repositories/ticket-status.repository';

@Injectable()
export class TicketStatusService
  implements
    ServiceBase<
      TicketStatusEntity,
      CreateTicketStatusDto,
      UpdateTicketStatusDto
    >
{
  constructor(
    private readonly ticketStatusRepository: TicketStatusRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateTicketStatusDto): Promise<TicketStatusEntity> {
    const ticketStatus = await this.ticketStatusRepository.create(dto);

    return ticketStatus;
  }

  async findAll(
    queryParams: SearchTicketStatusDto,
  ): Promise<FindAllResultEntity<TicketStatusEntity>> {
    const { name, code } = queryParams;

    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<TicketStatusEntity> | null>(
        `ticket_status_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .where({
        name: name && { contains: name },
        code: code && { contains: code },
      })
      .sort()
      .pagination()
      .handle();

    const ticketStatus = await this.ticketStatusRepository.findAll(query);
    const total = await this.ticketStatusRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`ticket_status_${queryParamsStringfy}`, {
      data: ticketStatus,
      info,
    });

    return { data: ticketStatus, info };
  }

  async findById(id: string): Promise<TicketStatusEntity> {
    const ticketStatus = await this.ticketStatusRepository.findById(id);

    if (!ticketStatus)
      throw new HttpException('Ticket status not found', HttpStatus.NOT_FOUND);

    return ticketStatus;
  }

  async update(dto: UpdateTicketStatusDto): Promise<TicketStatusEntity> {
    const ticketStatus = await this.findById(dto.id);

    const update = await this.ticketStatusRepository.update({
      ...dto,
      id: ticketStatus.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const ticketStatus = await this.findById(id);

    const remove = await this.ticketStatusRepository.softDelete(
      ticketStatus.id,
    );

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
