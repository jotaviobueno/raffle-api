import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreatePaymentGatewayConfigDto,
  SearchPaymentGatewayConfigDto,
  UpdatePaymentGatewayConfigDto,
} from 'src/domain/dtos';
import {
  PaymentGatewayConfigEntity,
  FindAllResultEntity,
} from 'src/domain/entities';
import { QueryBuilder } from 'src/common/utils';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { PaymentGatewayConfigRepository } from '../repositories/payment-gateway-config.repository';

@Injectable()
export class PaymentGatewayConfigService
  implements
    ServiceBase<
      PaymentGatewayConfigEntity,
      CreatePaymentGatewayConfigDto,
      UpdatePaymentGatewayConfigDto
    >
{
  constructor(
    private readonly paymentGatewayConfigRepository: PaymentGatewayConfigRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(
    dto: CreatePaymentGatewayConfigDto,
  ): Promise<PaymentGatewayConfigEntity> {
    const paymentGatewayConfig =
      await this.paymentGatewayConfigRepository.create(dto);

    return paymentGatewayConfig;
  }

  async findAll({
    code,
    name,
    ...queryParams
  }: SearchPaymentGatewayConfigDto): Promise<
    FindAllResultEntity<PaymentGatewayConfigEntity>
  > {
    const queryParamsStringfy = JSON.stringify(queryParams);

    const cache =
      await this.cacheManager.get<FindAllResultEntity<PaymentGatewayConfigEntity> | null>(
        `payment_gateway_configs_${queryParamsStringfy}`,
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

    const paymentGatewayConfigs =
      await this.paymentGatewayConfigRepository.findAll(query);
    const total = await this.paymentGatewayConfigRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    await this.cacheManager.set(
      `payment_gateway_configs_${queryParamsStringfy}`,
      {
        data: paymentGatewayConfigs,
        info,
      },
    );

    return { data: paymentGatewayConfigs, info };
  }

  async findById(id: string): Promise<PaymentGatewayConfigEntity> {
    const paymentGatewayConfig =
      await this.paymentGatewayConfigRepository.findById(id);

    if (!paymentGatewayConfig)
      throw new HttpException(
        'Payment gateway config not found',
        HttpStatus.NOT_FOUND,
      );

    return paymentGatewayConfig;
  }

  async update(
    dto: UpdatePaymentGatewayConfigDto,
  ): Promise<PaymentGatewayConfigEntity> {
    const paymentGatewayConfig = await this.findById(dto.id);

    const update = await this.paymentGatewayConfigRepository.update({
      ...dto,
      id: paymentGatewayConfig.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const paymentGatewayConfig = await this.findById(id);

    const remove = await this.paymentGatewayConfigRepository.softDelete(
      paymentGatewayConfig.id,
    );

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
