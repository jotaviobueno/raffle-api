type BillingType = 'BOLETO' | 'CREDIT_CARD' | 'PIX';
type Cycle = 'WEEKLY';

interface Discount {
  value: number;
  dueDateLimitDays: number;
  type: 'FIXED' | 'PERCENTAGE';
}

interface Interest {
  value: number;
}

interface Fine {
  value: number;
}

interface Split {
  walletId: string;
  fixedValue: number;
  percentualValue: number;
  status: 'PENDING' | 'AWAITING_CREDIT' | 'CANCELLED' | 'DONE' | 'REFUNDED';
  refusalReason?: 'RECEIVABLE_UNIT_AFFECTED_BY_EXTERNAL_CONTRACTUAL_EFFECT';
  cancellationReason?:
    | 'PAYMENT_DELETED'
    | 'PAYMENT_OVERDUE'
    | 'PAYMENT_RECEIVED_IN_CASH'
    | 'PAYMENT_REFUNDED';
}

interface Callback {
  url: string;
}

export interface CreateAsaasSubscriptionDto {
  customer: string;
  billingType: BillingType;
  value: number;
  nextDueDate: Date;
  discount?: Discount;
  interest?: Interest;
  fine?: Fine;
  cycle: string;
  description?: string;
  endDate?: Date;
  maxPayments?: number;
  externalReference?: string;
  split?: Split[];
  creditCard?: CreateAsaasSubscritpionCreditCardDto;
  creditCardHolderInfo?: CreateAsaasSubscritpionCreditCardHolderInfoDto;
  callback?: Callback;
  remoteIp: string;
}

export interface CreateAsaasSubscritpionCreditCardDto {
  holderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  ccv: string;
}

export interface CreateAsaasSubscritpionCreditCardHolderInfoDto {
  name: string;
  email: string;
  cpfCnpj: string;
  postalCode: string;
  addressNumber: string;
  addressComplement?: string;
  phone: string;
  mobilePhone?: string;
}
