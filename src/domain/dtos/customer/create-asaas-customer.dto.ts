//  https://docs.asaas.com/reference/criar-novo-cliente
export class CreateAsaasCustomerDto {
  name: string;
  cpfCnpj: string;
  mobilePhone?: string;
  email?: string;
  phone?: string;
  address?: string;
  addressNumber?: string;
  complement?: string;
  province?: string;
  postalCode?: string;
  externalReference?: string;
  notificationDisabled?: boolean;
  additionalEmails?: string;
  municipalInscription?: string;
  stateInscription?: string;
  observations?: string;
  groupName?: string;
  company?: string;
}

export class CreateSubAccountDto {
  name: string;
  email: string;
  cpfCnpj: string;
  loginEmail?: string;
  birthDate?: Date;
  companyType?: 'MEI' | 'LIMITED' | 'ASSOCIATION' | 'INDIVIDUAL';
  phone?: string;
  site?: string;
  mobilePhone: string;
  incomeValue: number;
  address: string;
  addressNumber: string;
  complement?: string;
  province: string;
  postalCode: string;
  webhooks: {
    name?: string;
    url: string;
    email: string;
    apiVersion: 2 | 3;
    enabled: boolean;
    interrupted: boolean;
    events: string[];
    sendType: 'SEQUENTIALLY' | 'NON_SEQUENTIALLY';
  }[];
}
