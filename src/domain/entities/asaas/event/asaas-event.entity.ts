import {
  ASAAS_BILING_TYPE_ENUM,
  ASAAS_CHARGE_BACK_ENUM,
  ORDER_STATUS_ENUM,
} from 'src/common/enums';
import { AsaasBaseEntity } from '../base-entity';

type Split = {
  walletId: string;
  fixedValue?: number;
  status: 'PENDING' | 'AWAITING_CREDIT' | 'CANCELLED' | 'DONE' | 'REFUSED';
  refusalReason: any;
  percentualValue?: number;
};

type Chargeback = {
  status: 'REQUESTED' | 'IN_DISPUTE' | 'DISPUTE_LOST' | 'REVERSED' | 'DONE';
  reason: keyof typeof ASAAS_CHARGE_BACK_ENUM;
};

type Refund = {
  dateCreated: Date;
  status: 'PENDING' | 'CANCELLED' | 'DONE';
  value: number;
  description: string;
  transactionReceiptUrl: string;
};

type Fine = {
  value: number;
  type: string;
};

type Interest = {
  value: number;
  type: string;
};

type Discount = {
  value: number;
  dueDateLimitDays: number;
  limitedDate: any;
  type: 'FIXED' | 'PERCENTAGE';
};

type CreditCard = {
  creditCardNumber: string;
  creditCardBrand: string;
  creditCardToken: string;
};

class Payment extends AsaasBaseEntity<Payment> {
  id: string;
  dateCreated: string;
  customer: string;
  subscription?: string;
  installment?: string;
  paymentLink?: string;
  dueDate: string;
  originalDueDate: string;
  value: number;
  netValue: number;
  originalValue?: number | null;
  interestValue?: number | null;
  nossoNumero?: string | null;
  description: string;
  externalReference: string;
  billingType: keyof typeof ASAAS_BILING_TYPE_ENUM;
  status: string;
  pixTransaction?: string | null;
  confirmedDate: string;
  paymentDate: string;
  clientPaymentDate: string;
  installmentNumber?: string | null;
  creditDate: string;
  custody?: string | null;
  estimatedCreditDate: string;
  invoiceUrl: string;
  bankSlipUrl?: string | null;
  transactionReceiptUrl: string;
  invoiceNumber?: string;
  deleted?: boolean;
  anticipated?: boolean;
  anticipable?: boolean;
  lastInvoiceViewedDate?: string;
  lastBankSlipViewedDate?: string;
  postalService?: boolean;
  creditCard?: CreditCard;
  discount?: Discount;
  fine?: Fine;
  interest?: Interest;
  split?: Split[];
  chargeback?: Chargeback;
  refunds?: Refund;
}

export class AsaasEventDto {
  id: string;
  event: ORDER_STATUS_ENUM;
  payment: Payment;
}
