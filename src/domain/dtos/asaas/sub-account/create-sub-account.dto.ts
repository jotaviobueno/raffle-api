export class CreateAsaasSubAccountDto {
  name: string;
  email: string;
  loginEmail?: string;
  cpfCnpj: string;
  bithDate?: Date;
  companyType?: 'MEI' | 'LIMITED' | 'INDIVIDUAL' | 'ASSOCIATION';
  phone?: string;
  mobilePhone: string;
  site?: string;
  incomeValue: string;
  address: string;
  addressNumber: string;
  complement?: string;
  province: string;
  postalCode: string;
  webhooks: SubAccountWebhookEntity[];
}

interface SubAccountWebhookEntity {
  name?: string;
  url: string;
  email: string;
  sendType: 'SEQUENTIALLY' | 'NON_SEQUENTIALLY';
  apiVersion: 2 | 3;
  enabled: boolean;
  interrupted: boolean;
  authToken: string;
  events: string[];
}
