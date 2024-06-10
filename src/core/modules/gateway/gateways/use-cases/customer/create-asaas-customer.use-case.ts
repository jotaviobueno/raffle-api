import { Injectable } from '@nestjs/common';
import { AsaasService } from '../../../services/asaas.service';
import { AsaasGatewayDto } from 'src/domain/dtos';
import { AsaasCustomerEntity } from 'src/domain/entities';

@Injectable()
export class CreateAsaasCustomerUseCase {
  constructor(private readonly asaasService: AsaasService) {}

  execute(data: AsaasGatewayDto): Promise<AsaasCustomerEntity> {
    return this.asaasService.createCustomer({
      addressNumber: data.cart.cartPayment.address.number,
      complement: data.cart.cartPayment.address.complement,
      cpfCnpj: data.cart.customer.document.replace(/[\.-]/g, ''),
      mobilePhone: data.cart.customer.mobilePhone.replace(/[\D+55]/g, ''),
      phone: data.cart?.customer?.phone?.replace(/[\D+55]/g, ''),
      email: data.cart.customer.email,
      name: data.cart.customer.name,
      province: data.cart.cartPayment.address.neighborhood,
      postalCode: data.cart.cartPayment.address.postcode,
      externalReference: data.cart.customer.id,
      notificationDisabled: true,
      address: data.cart.cartPayment.address.street,
    });
  }
}
