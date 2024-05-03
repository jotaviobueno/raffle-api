import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateQuotasDto, SearchQuotasDto } from 'src/domain/dtos';
import { FindAllResultEntity, QutoasEntity } from 'src/domain/entities';
import { RaffleService } from './raffle.service';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QutoasRepository } from '../repositories/quotas.repository';
import { UserService } from '../../user/services/user.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { JOBS_ENUM, QUEUES_ENUM } from 'src/common/enums';

@Injectable()
export class QuotasService
  implements ServiceBase<QutoasEntity | boolean, CreateQuotasDto>
{
  constructor(
    private readonly quotasRepository: QutoasRepository,
    private readonly userService: UserService,
    private readonly raffleService: RaffleService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @InjectQueue(QUEUES_ENUM.QUOTAS)
    private readonly quotasQueue: Queue,
  ) {}

  async create(dto: CreateQuotasDto): Promise<boolean> {
    const raffle = await this.raffleService.findById(dto.raffleId);

    const customer = await this.userService.findById(dto.customerId);

    await this.quotasQueue.add(
      JOBS_ENUM.CREATE_MANY_QUOTAS_JOB,
      { raffle, dto: { ...dto, customerId: customer.id } },
      {
        removeOnComplete: true,
        removeOnFail: true,
      },
    );

    return true;
  }

  async findAll({
    customerId,
    raffleId,
    number,
    ...queryParams
  }: SearchQuotasDto): Promise<FindAllResultEntity<QutoasEntity>> {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<QutoasEntity> | null>(
        `quotas_${queryParamsStringfy}`,
      );

    if (cache) return cache;

    const query = new QueryBuilder(queryParams)
      .where({
        raffleId: raffleId && raffleId,
        customerId: customerId && customerId,
        number: number && number,
      })
      .sort()
      .pagination()
      .handle();

    const quotas = await this.quotasRepository.findAll(query);
    const total = await this.quotasRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(`quotas_${queryParamsStringfy}`, {
      data: quotas,
      info,
    });

    return { data: quotas, info };
  }

  async findByNumberAndRaffleId(
    number: string,
    raffleId: string,
  ): Promise<QutoasEntity> {
    const quotas = await this.quotasRepository.findByNumberAndRaffleId(
      number,
      raffleId,
    );

    if (!quotas)
      throw new HttpException('Quotas not found', HttpStatus.NOT_FOUND);

    return quotas;
  }

  async findById(id: string): Promise<QutoasEntity> {
    const quotas = await this.quotasRepository.findById(id);

    if (!quotas)
      throw new HttpException('Quotas not found', HttpStatus.NOT_FOUND);

    return quotas;
  }

  async remove(id: string): Promise<boolean> {
    const quotas = await this.findById(id);

    const remove = await this.quotasRepository.softDelete(quotas.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
