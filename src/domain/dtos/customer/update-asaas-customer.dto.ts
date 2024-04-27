import { PartialType } from '@nestjs/mapped-types';
import { CreateAsaasCustomerDto } from './create-asaas-customer.dto';

export class UpdateAsaasCustomerDto extends PartialType(
  CreateAsaasCustomerDto,
) {
  id: string;
}
