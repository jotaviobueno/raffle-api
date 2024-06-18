import { Injectable } from '@nestjs/common';
import { AsaasService } from '../../services/asaas.service';
import { CreateCheckoutDto } from 'src/domain/dtos';
import {
  CartWithRelationsEntity,
  AsaasCustomerEntity,
  AsaasGatewayEntity,
} from 'src/domain/entities';
import { getCycleDate } from 'src/common/utils';
import { randomUUID } from 'crypto';

@Injectable()
export class AsaasProcessSubscriptionByBillingTypeUseCase {
  constructor(private readonly asaasService: AsaasService) {}

  public async execute(
    cart: CartWithRelationsEntity,
    customer: AsaasCustomerEntity,
    dto: CreateCheckoutDto,
  ): Promise<AsaasGatewayEntity> {
    const subscription = await this.asaasService.createSubscription({
      billingType: 'BOLETO',
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

    const bankSlip = await this.asaasService.getBankSlip(subscription.id);

    return {
      cart,
      data: { ...subscription, bankSlip },
      customer,
    };
  }
}
