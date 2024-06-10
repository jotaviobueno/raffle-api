import { Injectable } from '@nestjs/common';
import { AsaasService } from '../../../services/asaas.service';
import { CreateCheckoutDto } from 'src/domain/dtos';
import {
  CartWithRelationsEntity,
  AsaasCustomerEntity,
  AsaasGatewayEntity,
} from 'src/domain/entities';
import { addMinutes } from 'date-fns';

@Injectable()
export class AsaasProcessOrderByCreditCardUseCase {
  constructor(private readonly asaasService: AsaasService) {}

  public async execute(
    cart: CartWithRelationsEntity,
    customer: AsaasCustomerEntity,
    dto: CreateCheckoutDto,
  ): Promise<AsaasGatewayEntity> {
    const payment = await this.asaasService.createPayment({
      customer: customer.id,
      billingType: 'CREDIT_CARD',
      value: cart.cartTotal.total,
      dueDate: addMinutes(new Date(), 10),
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

    return { cart, data: payment, customer };
  }
}
