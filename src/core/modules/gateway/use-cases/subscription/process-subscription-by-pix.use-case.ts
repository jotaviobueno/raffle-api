import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from 'src/domain/dtos';
import {
  CartWithRelationsEntity,
  AsaasCustomerEntity,
  AsaasGatewayEntity,
} from 'src/domain/entities';
import { getCycleDate } from 'src/common/utils';
import { randomUUID } from 'crypto';
import { AsaasService } from '../../services/asaas.service';

@Injectable()
export class AsaasProcessSubscriptionByPixUseCase {
  constructor(private readonly asaasService: AsaasService) {}

  public async execute(
    cart: CartWithRelationsEntity,
    customer: AsaasCustomerEntity,
    dto: CreateCheckoutDto,
  ): Promise<AsaasGatewayEntity> {
    const subscription = await this.asaasService.createSubscription({
      billingType: 'PIX',
      customer: customer.id,
      cycle: cart.cartItems.find((item) => item.planId)?.plan?.planCycle?.code,
      value: cart.cartTotal.total,
      nextDueDate: new Date(),
      endDate: getCycleDate(
        cart.cartItems.find((item) => item.planId)?.plan?.planCycle?.code,
      ),
      maxPayments: 10,
      externalReference: randomUUID(),
      remoteIp: dto.ip ? dto.ip : '',
    });

    const pix = await this.asaasService.getPixById(subscription.id);

    return {
      cart,
      data: { ...subscription, pix },
      customer,
    };
  }
}
