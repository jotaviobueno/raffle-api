import { AsaasCustomerEntity } from 'src/domain/entities';

export interface CreateAsaasPaymentDto {
  customer: AsaasCustomerEntity;
  billingType: string;
  value: number;
  dueDate: Date;
  discount?: number;
  creditCard?: CreateAsaasPaymentCreditCardDto;
  creditCardHolderInfo?: CreateAsaasPaymentCreditCardHolderInfoDto;
  creditCardToken?: string;
  remoteIp?: string;
}

export interface CreateAsaasPaymentCreditCardDto {
  holderName?: string;
  number?: string;
  expiryMonth?: string;
  expiryYear?: string;
  ccv?: string;
}

export interface CreateAsaasPaymentCreditCardHolderInfoDto {
  name: string;
  email: string;
  cpfCnpj: string;
  postalCode: string;
  addressNumber: string;
  addressComplement?: string;
  phone: string;
  mobilePhone?: string;
}
