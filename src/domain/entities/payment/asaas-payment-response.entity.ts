import { ASAAS_PAYMENT_STATUS_ENUM } from 'src/common/enums';
import { CreateAsaasPaymentCreditCardHolderInfoDto } from 'src/domain/dtos';

export class AsaasPaymentResponseEntity {
  object: string;
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink: any;
  dueDate: string;
  value: number;
  netValue: number;
  billingType: string;
  canBePaidAfterDueDate: boolean;
  pixTransaction: any;
  status: keyof typeof ASAAS_PAYMENT_STATUS_ENUM;
  description: string;
  externalReference: string;
  originalValue: any;
  interestValue: any;
  originalDueDate: string;
  paymentDate: any;
  clientPaymentDate: any;
  installmentNumber: any;
  transactionReceiptUrl: any;
  nossoNumero: string;
  invoiceUrl: string;
  bankSlipUrl: string;
  invoiceNumber: string;
  discount: {
    value: number;
    dueDateLimitDays: number;
  };
  fine: {
    value: number;
  };
  interest: {
    value: number;
  };
  deleted: boolean;
  postalService: boolean;
  anticipated: boolean;
  anticipable: boolean;
  refunds: any;
  creditCardToken?: string;
  creditCard?: {
    creditCardNumber: string;
    creditCardBrand: string;
    creditCardToken: string;
  };
  creditCardHolderInfo?: CreateAsaasPaymentCreditCardHolderInfoDto;
}
