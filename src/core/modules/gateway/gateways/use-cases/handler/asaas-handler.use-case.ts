import { Injectable } from '@nestjs/common';
import { AsaasGatewayDto } from 'src/domain/dtos';
import { AsaasCustomerEntity, AsaasGatewayEntity } from 'src/domain/entities';
import {
  AsaasProcessOrderByBankSlipUseCase,
  AsaasProcessOrderByCreditCardUseCase,
  AsaasProcessOrderByPixUseCase,
} from '../order';
import {
  AsaasProcessSubscriptionByPixUseCase,
  AsaasProcessSubscriptionByCreditCardUseCase,
  AsaasProcessSubscriptionByBillingTypeUseCase,
} from '../subscription';

@Injectable()
export class AsaasHandlerUseCase {
  constructor(
    private readonly asaasProcessOrderByBankSlipUseCase: AsaasProcessOrderByBankSlipUseCase,
    private readonly asaasProcessOrderByCreditCardUseCase: AsaasProcessOrderByCreditCardUseCase,
    private readonly asaasProcessOrderByPixUseCase: AsaasProcessOrderByPixUseCase,
    //
    private readonly asaasProcessSubscriptionByPixUseCase: AsaasProcessSubscriptionByPixUseCase,
    private readonly asaasProcessSubscriptionByCreditCardUseCase: AsaasProcessSubscriptionByCreditCardUseCase,
    private readonly asaasProcessSubscriptionByBillingTypeUseCase: AsaasProcessSubscriptionByBillingTypeUseCase,
  ) {}

  public async execute({
    customer,
    ...data
  }: AsaasGatewayDto & {
    customer: AsaasCustomerEntity;
  }): Promise<AsaasGatewayEntity> {
    switch (data.cart.cartPayment.paymentMethod.code) {
      case 'pix':
        if (data.cart.cartItems.some((item) => item.planId))
          return this.asaasProcessSubscriptionByPixUseCase.execute(
            data.cart,
            customer,
            data.dto,
          );
        else
          return this.asaasProcessOrderByPixUseCase.execute(
            data.cart,
            customer,
            data.dto,
          );
      case 'bank.slip':
        if (data.cart.cartItems.some((item) => item.planId))
          return this.asaasProcessSubscriptionByBillingTypeUseCase.execute(
            data.cart,
            customer,
            data.dto,
          );
        else
          return this.asaasProcessOrderByBankSlipUseCase.execute(
            data.cart,
            customer,
            data.dto,
          );
      case 'credit.card':
        if (data.cart.cartItems.some((item) => item.planId))
          return this.asaasProcessSubscriptionByCreditCardUseCase.execute(
            data.cart,
            customer,
            data.dto,
          );
        else
          return this.asaasProcessOrderByCreditCardUseCase.execute(
            data.cart,
            customer,
            data.dto,
          );
    }
  }
}
