export interface AsaasPaymentEntity {
  id: string;
  customer: string;
  billingType: string;
  value: number;
  dateCreated: string;
  dueDate: string;
  nossoNumero: string;
  bankSlipUrl: string;
  creditCard: any;
  status: string;
}
