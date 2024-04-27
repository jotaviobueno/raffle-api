import { ORDER_STATUS_ENUM } from 'src/common/enums';

export class AsaasWebhookEventDto {
  id: string;
  event: keyof typeof ORDER_STATUS_ENUM;
  payment: {
    object: string;
    id: string;
    dateCreated: string;
    customer: string;
    subscription: string;
    installment: string;
    paymentLink: string;
    dueDate: string;
    originalDueDate: string;
    value: number;
    netValue: number;
    originalValue: any;
    interestValue: any;
    nossoNumero: any;
    description: string;
    externalReference: string;
    billingType: string;
    status: string;
    pixTransaction: any;
    confirmedDate: string;
    paymentDate: string;
    clientPaymentDate: string;
    installmentNumber: any;
    creditDate: string;
    custody: any;
    estimatedCreditDate: string;
    invoiceUrl: string;
    bankSlipUrl: any;
    transactionReceiptUrl: string;
    invoiceNumber: string;
    deleted: boolean;
    anticipated: boolean;
    anticipable: boolean;
    lastInvoiceViewedDate: string;
    lastBankSlipViewedDate: any;
    postalService: boolean;
    creditCard: {
      creditCardNumber: string;
      creditCardBrand: string;
      creditCardToken: string;
    };
    discount: {
      value: number;
      dueDateLimitDays: number;
      limitedDate: any;
      type: string;
    };
    fine: {
      value: number;
      type: string;
    };
    interest: {
      value: number;
      type: string;
    };
    split: Array<{
      walletId: string;
      fixedValue?: number;
      status: string;
      refusalReason: any;
      percentualValue?: number;
    }>;
    chargeback: {
      status: string;
      reason: string;
    };
    refunds: any;
  };
}
