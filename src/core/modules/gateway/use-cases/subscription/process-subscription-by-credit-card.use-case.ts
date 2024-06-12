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
export class AsaasProcessSubscriptionByCreditCardUseCase {
  constructor(private readonly asaasService: AsaasService) {}

  public async execute(
    cart: CartWithRelationsEntity,
    customer: AsaasCustomerEntity,
    dto: CreateCheckoutDto,
  ): Promise<AsaasGatewayEntity> {
    const subscription = await this.asaasService.createSubscription({
      billingType: 'CREDIT_CARD',
      customer: customer.id,
      cycle: cart.cartItems.find((item) => item.planId)?.plan?.planCycle?.code,
      value: cart.cartTotal.total,
      nextDueDate: new Date(),
      endDate: getCycleDate(
        cart.cartItems.find((item) => item.planId)?.plan?.planCycle?.code,
      ),
      maxPayments: 10,
      externalReference: randomUUID(),
      creditCard: {
        holderName: dto.holder,
        number: dto.number.replace(/\s/g, ''),
        expiryMonth:
          dto.expirationMonth < 9
            ? `0${dto.expirationMonth.toString()}`
            : dto.expirationMonth.toString(),
        expiryYear: dto.expirationYear.toString(),
        ccv: dto.cvv.toString(),
      },
      creditCardHolderInfo: {
        name: dto.holder,
        email: cart.customer.email,
        cpfCnpj: cart.customer.document.replace(/[\.-]/g, ''),
        mobilePhone: cart.customer.mobilePhone.replace(/[\D+55]/g, ''),
        postalCode: cart.cartPayment.address.postcode,
        addressNumber: cart.cartPayment.address.number,
        addressComplement: cart.cartPayment.address.street,
        phone: cart.customer?.phone?.replace(/[\D+55]/g, ''),
      },
      remoteIp: dto.ip ? dto.ip : '',
    });

    return {
      cart,
      data: subscription,
      customer,
    };
  }
}
