import { Injectable, Logger } from '@nestjs/common';
import { PaymentGateway } from '../payment/gateway/payment.gateway';
import {
  AsaasCustomerEntity,
  AsaasPaymentResponseEntity,
  CartWithRelationsEntity,
} from 'src/domain/entities';
import { AsaasService } from './asaas.service';
import { CreateCheckoutDto } from 'src/domain/dtos';
import { addDays, addMinutes } from 'date-fns';

@Injectable()
export class AsaasGateway extends PaymentGateway<{
  cart: CartWithRelationsEntity;
  payment: AsaasPaymentResponseEntity;
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

  public async process(data: {
    cart: CartWithRelationsEntity;
    dto: CreateCheckoutDto;
  }): Promise<{
    cart: CartWithRelationsEntity;
    payment: AsaasPaymentResponseEntity;
    data: any;
    customer: AsaasCustomerEntity;
  }> {
    this.asaasService.setConfig(this.config);

    const customer = await this.asaasService.createCustomer({
      addressNumber: data.cart.cartPayment.address.number,
      complement: data.cart.cartPayment.address.complement,
      cpfCnpj: data.cart.customer.document.replace(/[\.-]/g, ''),
      mobilePhone: data.cart.customer.mobilePhone.replace(/[\D+55]/g, ''),
      phone: data.cart?.customer?.phone?.replace(/[\D+55]/g, ''),
      email: data.cart.customer.email,
      name: data.cart.customer.fullName,
      province: data.cart.cartPayment.address.neighborhood,
      postalCode: data.cart.cartPayment.address.postcode,
      externalReference: data.cart.customer.id,
      notificationDisabled: true,
      address: data.cart.cartPayment.address.street,
    });

    switch (data.cart.cartPayment.paymentMethod.code) {
      case 'pix':
        return this.processPix(data.cart, customer, data.dto);
      case 'bank.slip':
        return this.processBankSlip(data.cart, customer, data.dto);
      case 'credit.card':
        return this.processCreditCard(data.cart, customer, data.dto);
    }
  }

  private async processPix(
    cart: CartWithRelationsEntity,
    customer: AsaasCustomerEntity,
    dto: CreateCheckoutDto,
  ) {
    const payment = await this.asaasService.createPayment({
      customer: customer.id,
      billingType: 'PIX',
      value: cart.cartTotal.total,
      dueDate: addMinutes(new Date(), 10),
      discount: { value: cart.cartTotal.discount },
      remoteIp: dto.ip ? dto.ip : '',
    });

    const pix = await this.asaasService.getPixById(payment.id);

    return { cart, data: pix, payment, customer };
  }

  private async processBankSlip(
    cart: CartWithRelationsEntity,
    customer: AsaasCustomerEntity,
    dto: CreateCheckoutDto,
  ) {
    const payment = await this.asaasService.createPayment({
      customer: customer.id,
      billingType: 'BOLETO',
      value: cart.cartTotal.total,
      dueDate: addDays(new Date(), 3),
      remoteIp: dto.ip ? dto.ip : '',
    });

    const bankSlip = await this.asaasService.getBankSlip(payment.id);

    return { cart, data: bankSlip, payment, customer };
  }

  private async processCreditCard(
    cart: CartWithRelationsEntity,
    customer: AsaasCustomerEntity,
    dto: CreateCheckoutDto,
  ) {
    try {
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

      if (payment.status === 'AUTHORIZED')
        await this.asaasService.preAuthorization(payment.id);

      return { cart, data: payment, payment, customer };
    } catch (e) {
      Logger.log('PROCESSS CREDIT-CARD ASAAS ERROR', e);

      throw e;
    }
  }
}
