import { Injectable, Logger } from '@nestjs/common';
import { PaymentGateway } from '../payment/gateway/payment.gateway';
import { format } from 'date-fns';
import {
  AsaasCustomerEntity,
  OrderBankSlipEntity,
  OrderPixEntity,
  OrderWithRelationsEntity,
} from 'src/domain/entities';
import { AsaasService } from './asaas.service';

@Injectable()
export class AsaasGateway extends PaymentGateway {
  constructor(private readonly asaasService: AsaasService) {
    super();
  }

  public async process(order: OrderWithRelationsEntity): Promise<boolean> {
    const customer = await this.asaasService.createCustomer({
      name: `${order.customer.firstName} ${order.customer.lastName}`,
      cpfCnpj: order.customer.document,
    });

    switch (order.orderPayment.paymentMethod.code) {
      case 'pix':
        return this.processPix(order, customer);
      case 'bank.slip':
        return this.processBankSlip(order, customer);
      case 'credit.card':
        return this.processCreditCard(order, customer);
    }
  }

  private async processPix(
    order: OrderWithRelationsEntity,
    customer: AsaasCustomerEntity,
  ): Promise<boolean> {
    const payment = await this.asaasService.createPayment({
      customer,
      billingType: 'PIX',
      value: order.orderTotal.total,
      dueDate: order.dueDate.toISOString().split('T')[0],
    });

    const pix = await this.asaasService.getPixById(payment.id);

    const orderPix = new OrderPixEntity();
    orderPix.copyPaste = pix.payload;
    orderPix.image = pix.encodedImage;
    orderPix.expiratAt = new Date(pix.expirationDate);

    order.orderPayment.orderPix = orderPix;

    order.dueDate = new Date(pix.expirationDate);

    return true;
  }

  private async processBankSlip(
    order: OrderWithRelationsEntity,
    customer: AsaasCustomerEntity,
  ): Promise<boolean> {
    const payment = await this.asaasService.createPayment({
      customer,
      billingType: 'BOLETO',
      value: order.orderTotal.total,
      dueDate: order.dueDate.toISOString().split('T')[0],
    });

    const bankSlip = await this.asaasService.getBankSlip(payment.id);

    const orderBankSlip = new OrderBankSlipEntity();

    orderBankSlip.bankSlipUrl = payment.bankSlipUrl;
    orderBankSlip.ourNumber = payment.nossoNumero;
    orderBankSlip.expirationAt = new Date(payment.dueDate);
    orderBankSlip.identificationField = bankSlip.identificationField;
    orderBankSlip.barCode = bankSlip.barCode;
    orderBankSlip.orderPaymentId = order.id;

    order.dueDate = new Date(payment.dueDate);

    return true;
  }

  private async processCreditCard(
    order: OrderWithRelationsEntity,
    customer: AsaasCustomerEntity,
  ): Promise<boolean> {
    try {
      const payment = await this.asaasService.createPayment({
        customer,
        billingType: 'CREDIT_CARD',
        value: order.orderTotal.total,
        dueDate: format(new Date(), 'dd/MM/yyyy'),
        creditCard: {
          holderName: order.orderPayment.orderCreditCard.name,
          number: order.orderPayment.orderCreditCard.number,
          expiryMonth:
            order.orderPayment.orderCreditCard.expirationMonth.toString(),
          expiryYear:
            order.orderPayment.orderCreditCard.expirationYear.toString(),
          ccv: order.orderPayment.orderCreditCard.cvv.toString(),
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

      order.orderPayment.orderCreditCard.number =
        payment.creditCard.creditCardNumber;
      order.orderPayment.orderCreditCard.brand =
        payment.creditCard.creditCardBrand;
      order.orderPayment.orderCreditCard.token =
        payment.creditCard.creditCardToken;
      order.orderPayment.orderCreditCard.status = payment.status;
    } catch (error) {
      Logger.log('PROCESSS CREDIT-CARD ASAAS ERROR', error?.errors);
    }

    return true;
  }
}
