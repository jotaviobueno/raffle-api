import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreatePaymentMethodDto,
  SearchPaymentMethodDto,
  UpdatePaymentMethodDto,
} from 'src/domain/dtos';
import { FindAllResultEntity, PaymentMethodEntity } from 'src/domain/entities';
import { PaymentMethodRepository } from '../repositories/payment-method.repository';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { QueryBuilder } from 'src/common/utils';
import { GatewayService } from '../../gateway/services/gateway.service';

@Injectable()
export class PaymentMethodService
  implements
    ServiceBase<
      PaymentMethodEntity,
      CreatePaymentMethodDto,
      UpdatePaymentMethodDto
    >
{
  constructor(
    private readonly paymentMethodRepository: PaymentMethodRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly gatewayService: GatewayService,
  ) {}

  async create(dto: CreatePaymentMethodDto): Promise<PaymentMethodEntity> {
    const gateway = await this.gatewayService.findById(dto.gatewayId);

    const paymentMethod = await this.paymentMethodRepository.create({
      ...dto,
      gatewayId: gateway.id,
    });

    return paymentMethod;
  }

  async findAll(
    queryParams: SearchPaymentMethodDto,
  ): Promise<FindAllResultEntity<PaymentMethodEntity>> {
    const { code, name, instructions, isActive } = queryParams;

    const queryParamsStringfy = JSON.stringify(queryParams);

    if (queryParams.cache) {
      const cache =
        await this.cacheManager.get<FindAllResultEntity<PaymentMethodEntity> | null>(
          `payment_methods_${queryParamsStringfy}`,
        );

      if (cache) return cache;
    }

    const query = new QueryBuilder(queryParams)
      .where({
        name: name && { contains: name },
        code: code && { contains: code },
        isActive: isActive && isActive,
        instructions: instructions && { contains: instructions },
      })
      .sort()
      .date('createdAt')
      .pagination()
      .handle();

    const paymentMethods = await this.paymentMethodRepository.findAll(query);
    const total = await this.paymentMethodRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    if (queryParams.cache)
      await this.cacheManager.set(`payment_methods_${queryParamsStringfy}`, {
        data: paymentMethods,
        info,
      });

    return { data: paymentMethods, info };
  }

  async findById(id: string): Promise<PaymentMethodEntity> {
    const paymentGatewayConfig =
      await this.paymentMethodRepository.findById(id);

    if (!paymentGatewayConfig)
      throw new HttpException(
        'Payment gateway config not found',
        HttpStatus.NOT_FOUND,
      );

    return paymentGatewayConfig;
  }

  async update(dto: UpdatePaymentMethodDto): Promise<PaymentMethodEntity> {
    const paymentGatewayConfig = await this.findById(dto.id);

    const update = await this.paymentMethodRepository.update({
      ...dto,
      id: paymentGatewayConfig.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const award = await this.findById(id);

    const remove = await this.paymentMethodRepository.softDelete(award.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
