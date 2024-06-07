import {
  ASAAS_BILING_TYPE_ENUM,
  ASAAS_CHARGE_BACK_ENUM,
  ORDER_STATUS_ENUM,
} from 'src/common/enums';

export class AsaasEventDto {
  id: string;
  event: ORDER_STATUS_ENUM;
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
    billingType: keyof typeof ASAAS_BILING_TYPE_ENUM;
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
      type: 'FIXED' | 'PERCENTAGE';
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
      status: 'PENDING' | 'AWAITING_CREDIT' | 'CANCELLED' | 'DONE' | 'REFUSED';
      refusalReason: any;
      percentualValue?: number;
    }>;
    chargeback: {
      status: 'REQUESTED' | 'IN_DISPUTE' | 'DISPUTE_LOST' | 'REVERSED' | 'DONE';
      reason: keyof typeof ASAAS_CHARGE_BACK_ENUM;
    };
    refunds?: {
      dateCreated: Date;
      status: 'PENDING' | 'CANCELLED' | 'DONE';
      value: number;
      description: string;
      transactionReceiptUrl: string;
    };
  };
}
