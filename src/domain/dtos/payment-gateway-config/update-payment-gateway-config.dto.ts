import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentGatewayConfigDto } from './create-payment-gateway-config.dto';

export class UpdatePaymentGatewayConfigDto extends PartialType(
  CreatePaymentGatewayConfigDto,
) {
  id: string;
}
