type SplitStatus =
  | 'PENDING'
  | 'AWAITING_CREDIT'
  | 'CANCELLED'
  | 'DONE'
  | 'REFUNDED';
type RefusalReason = 'RECEIVABLE_UNIT_AFFECTED_BY_EXTERNAL_CONTRACTUAL_EFFECT';
type CancellationReason =
  | 'PAYMENT_DELETED'
  | 'PAYMENT_OVERDUE'
  | 'PAYMENT_RECEIVED_IN_CASH'
  | 'PAYMENT_REFUNDED';

type DiscountType = 'FIXED' | 'PERCENTAGE';

export interface AsaasBankSlipEntity {
  identificationField: string;
  nossoNumero: string;
  barCode: string;
}

export interface AsaasPixEntity {
  encodedImage: string;
  payload: string;
  expirationDate: Date;
}

export interface AsaasCreditCardEntity {
  creditCardNumber: string;
  creditCardBrand: string;
  creditCardToken: string;
}

export interface AsaasSplitEntity {
  id: string;
  walletId: string;
  fixedValue: number;
  totalValue: number;
  percentualValue: number;
  status: SplitStatus;
  refusalReason?: RefusalReason;
  cancellationReason?: CancellationReason;
}

export interface AsaasDiscountEntity {
  value: number;
  dueDateLimitDays: number;
  type: DiscountType;
}

export interface AsaasFineEntity {
  value: number;
}

export interface AsaasInterestEntity {
  value: number;
}
