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
