import {
  CreateAsaasPaymentCreditCardDto,
  CreateAsaasPaymentCreditCardHolderInfoDto,
} from 'src/domain/dtos';

export class PaymentAsaasResponseEntity {
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
  status: string;
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
  creditCard?: CreateAsaasPaymentCreditCardDto;
  creditCardHolderInfo?: CreateAsaasPaymentCreditCardHolderInfoDto;
}
