export interface CreateAsaasPaymentDto {
  customer: string;
  billingType: string;
  value: number;
  dueDate: Date;
  description?: string;
  externalReference?: string;
  installmentCount?: number;
  installmentValue?: number;
  discount?: { value: number };
  postalService?: boolean;
  creditCard?: CreateAsaasPaymentCreditCardDto;
  creditCardHolderInfo?: CreateAsaasPaymentCreditCardHolderInfoDto;
  creditCardToken?: string;
  remoteIp: string;
}

export interface CreateAsaasPaymentCreditCardDto {
  holderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  ccv: string;
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
