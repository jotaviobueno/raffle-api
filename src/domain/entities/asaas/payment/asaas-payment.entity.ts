import { ASAAS_PAYMENT_STATUS_ENUM } from 'src/common/enums';
import { CreateAsaasPaymentCreditCardHolderInfoDto } from 'src/domain/dtos';
import { AsaasBaseEntity } from '../base-entity';
import {
  AsaasBankSlipEntity,
  AsaasCreditCardEntity,
  AsaasFineEntity,
  AsaasInterestEntity,
  AsaasPixEntity,
  AsaasSplitEntity,
} from '../shared';

interface Discount {
  value: number;
  dueDateLimitDays: number;
  type: string;
}

interface Refund {
  dateCreated: string;
  status: string;
  value: number;
  description: string;
  transactionReceiptUrl: string;
}

interface Chargeback {
  status: string;
  reason: string;
}

export class AsaasPaymentEntity extends AsaasBaseEntity<AsaasPaymentEntity> {
  id: string;
  customer: string;
  dateCreated: string;
  dueDate: string;
  installment?: string;
  subscription?: string;
  paymentLink?: string;
  value: number;
  netValue: number;
  billingType: string;
  status: ASAAS_PAYMENT_STATUS_ENUM;
  description?: string;
  daysAfterDueDateToRegistrationCancellation?: number;
  externalReference?: string;
  canBePaidAfterDueDate?: boolean;
  pixTransaction?: string;
  pixQrCodeId?: string;
  originalValue?: number;
  interestValue?: number;
  originalDueDate?: string;
  paymentDate?: string;
  clientPaymentDate?: string;
  installmentNumber?: string;
  transactionReceiptUrl?: string;
  nossoNumero?: string;
  invoiceUrl?: string;
  bankSlipUrl?: string;
  invoiceNumber?: string;
  discount?: Discount;
  fine?: AsaasFineEntity;
  interest?: AsaasInterestEntity;
  deleted?: boolean;
  postalService?: boolean;
  anticipated?: boolean;
  anticipable?: boolean;
  refunds?: Refund[];
  split?: AsaasSplitEntity[];
  pix?: AsaasPixEntity;
  chargeback?: Chargeback;
  bankSlip?: AsaasBankSlipEntity;
  creditCard?: AsaasCreditCardEntity;
  creditCardHolderInfo?: CreateAsaasPaymentCreditCardHolderInfoDto;
  creditCardToken?: string;
}
