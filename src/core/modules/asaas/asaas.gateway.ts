import { Injectable, Logger } from '@nestjs/common';
import { PaymentGateway } from '../payment/gateway/payment.gateway';
import {
  AsaasCustomerEntity,
  OrderWithRelationsEntity,
  PaymentAsaasResponseEntity,
} from 'src/domain/entities';
import { AsaasService } from './asaas.service';
import { CreateCheckoutDto } from 'src/domain/dtos';

@Injectable()
export class AsaasGateway extends PaymentGateway<{
  order: OrderWithRelationsEntity;
  payment: PaymentAsaasResponseEntity;
  data?: any;
  customer: AsaasCustomerEntity;
}> {
  private code: 'asaas';
  private config = {};

  constructor(private readonly asaasService: AsaasService) {
    super();
  }

  public getCode(): string {
    return this.code;
  }

  public setConfig(config: any): void {
    this.config = config;
  }

  public async process({
    dto,
    order,
  }: {
    order: OrderWithRelationsEntity;
    dto: CreateCheckoutDto;
  }): Promise<{
    order: OrderWithRelationsEntity;
    payment: PaymentAsaasResponseEntity;
    data?: any;
    customer: AsaasCustomerEntity;
  }> {
    this.asaasService.setConfig(this.config);

    let customer: AsaasCustomerEntity;

    if (!order.customer.asaasCustomerId)
      customer = await this.asaasService.createCustomer({
        addressNumber: order.orderPayment.address.number,
        complement: order.orderPayment.address.complement,
        cpfCnpj: order.customer.document.replace(/[\.-]/g, ''),
        mobilePhone: order.customer.phone.replace(/[\D+55]/g, ''),
        email: order.customer.email,
        name: `${order.customer.firstName} ${order.customer.lastName}`,
        province: order.orderPayment.address.neighborhood,
        postalCode: order.orderPayment.address.postcode,
        externalReference: order.customer.id,
        notificationDisabled: true,
        address: order.orderPayment.address.street,
      });
    else
      customer = await this.asaasService.updateCustomer({
        id: order.customer.asaasCustomerId,
        addressNumber: order.orderPayment.address.number,
        complement: order.orderPayment.address.complement,
        cpfCnpj: order.customer.document.replace(/[\.-]/g, ''),
        mobilePhone: order.customer.phone.replace(/[\D+55]/g, ''),
        email: order.customer.email,
        name: `${order.customer.firstName} ${order.customer.lastName}`,
        province: order.orderPayment.address.neighborhood,
        postalCode: order.orderPayment.address.postcode,
        externalReference: order.customer.id,
        notificationDisabled: true,
        address: order.orderPayment.address.street,
      });

    switch (order.orderPayment.paymentMethod.code) {
      case 'pix':
        return this.processPix(order, customer);
      case 'bank.slip':
        return this.processBankSlip(order, customer);
      case 'credit.card':
        return this.processCreditCard(order, customer, dto);
    }
  }

  private async processPix(
    order: OrderWithRelationsEntity,
    customer: AsaasCustomerEntity,
  ) {
    const payment = await this.asaasService.createPayment({
      customer,
      billingType: 'PIX',
      value: order.orderTotal.total,
      dueDate: order.dueDate,
      discount: order.orderTotal.discount,
    });

    const pix = await this.asaasService.getPixById(payment.id);

    return { order, data: pix, payment, customer };
  }

  private async processBankSlip(
    order: OrderWithRelationsEntity,
    customer: AsaasCustomerEntity,
  ) {
    const payment = await this.asaasService.createPayment({
      customer,
      billingType: 'BOLETO',
      value: order.orderTotal.total,
      dueDate: new Date(),
    });

    const bankSlip = await this.asaasService.getBankSlip(payment.id);

    return { order, data: bankSlip, payment, customer };
  }

  private async processCreditCard(
    order: OrderWithRelationsEntity,
    customer: AsaasCustomerEntity,
    dto: CreateCheckoutDto,
  ) {
    try {
      const payment = await this.asaasService.createPayment({
        customer,
        billingType: 'CREDIT_CARD',
        value: order.orderTotal.total,
        dueDate: new Date(),
        creditCard: {
          holderName: dto.holder,
          number: dto.number,
          expiryMonth: dto.expirationMonth.toString(),
          expiryYear: dto.expirationYear.toString(),
          ccv: dto.cvv.toString(),
        },
        creditCardHolderInfo: {
          name: order.customer.firstName,
          email: order.customer.email,
          cpfCnpj: order.customer.document,
          postalCode: order.orderPayment.address.postcode,
          addressNumber: order.orderPayment.address.number,
          addressComplement: order.orderPayment.address.street,
          phone: order.customer.phone,
        },
      });

      return { order, payment, customer };
    } catch (e) {
      Logger.log('PROCESSS CREDIT-CARD ASAAS ERROR', e);

      throw e;
    }
  }
}
