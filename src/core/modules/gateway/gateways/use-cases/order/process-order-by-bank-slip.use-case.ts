import { Injectable } from '@nestjs/common';
import { AsaasService } from '../../../services/asaas.service';
import { CreateCheckoutDto } from 'src/domain/dtos';
import {
  CartWithRelationsEntity,
  AsaasCustomerEntity,
  AsaasGatewayEntity,
} from 'src/domain/entities';
import { addDays } from 'date-fns';

@Injectable()
export class AsaasProcessOrderByBankSlipUseCase {
  constructor(private readonly asaasService: AsaasService) {}

  public async execute(
    cart: CartWithRelationsEntity,
    customer: AsaasCustomerEntity,
    dto: CreateCheckoutDto,
  ): Promise<AsaasGatewayEntity> {
    const payment = await this.asaasService.createPayment({
      customer: customer.id,
      billingType: 'BOLETO',
      value: cart.cartTotal.total,
      dueDate: addDays(new Date(), 3),
      remoteIp: dto.ip ? dto.ip : '',
    });

    const bankSlip = await this.asaasService.getBankSlip(payment.id);

    return { cart, data: { ...payment, bankSlip }, customer };
  }
}
