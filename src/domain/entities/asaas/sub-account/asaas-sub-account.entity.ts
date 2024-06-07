export class AsaasSubAccountEntity {
  object: string;
  id: string;
  name: string;
  email: string;
  loginEmail: string;
  phone: string;
  mobilePhone: string;
  address: string;
  addressNumber: string;
  complement: string;
  province: string;
  postalCode: string;
  cpfCnpj: string;
  biirthDate: Date;
  personType: 'FISICA' | 'JURIDICA';
  companyType: 'MEI' | 'LIMITED' | 'INDIVIDUAL' | 'ASSOCIATION';
  city: number;
  state: string;
  country: string;
  tradingName: string;
  site: string;
  incomeRange:
    | 'UP_TO_5K'
    | 'FROM_5K_TO_10K'
    | 'FROM_10K_TO_20K'
    | 'ABOVE_20K'
    | 'UP_TO_50K'
    | 'FROM_50K_TO_100K'
    | 'FROM_100K_TO_250K'
    | 'FROM_250K_TO_1MM'
    | 'FROM_1MM_TO_5MM'
    | 'ABOVE_5MM';
  apiKey: string;
  walletId: string;
  accountNumber: {
    agency: string;
    account: string;
    accountDigit: string;
  };
}
