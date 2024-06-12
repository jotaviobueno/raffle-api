import { Injectable } from '@nestjs/common';
import { AsaasService } from '../../services/asaas.service';
import { CreateCheckoutDto } from 'src/domain/dtos';
import {
  CartWithRelationsEntity,
  AsaasCustomerEntity,
  AsaasGatewayEntity,
} from 'src/domain/entities';
import { addMinutes } from 'date-fns';
import { randomUUID } from 'crypto';

@Injectable()
export class AsaasProcessOrderByPixUseCase {
  constructor(private readonly asaasService: AsaasService) {}

  public async execute(
    cart: CartWithRelationsEntity,
    customer: AsaasCustomerEntity,
    dto: CreateCheckoutDto,
  ): Promise<AsaasGatewayEntity> {
    const payment = await this.asaasService.createPayment({
      customer: customer.id,
      billingType: 'PIX',
      value: cart.cartTotal.total,
      dueDate: addMinutes(new Date(), 10),
      discount: { value: cart.cartTotal.discount },
      remoteIp: dto.ip ? dto.ip : '',
      externalReference: randomUUID(),
    });

    const pix = await this.asaasService.getPixById(payment.id);

    return { cart, data: { ...payment, pix }, customer };
  }
}
