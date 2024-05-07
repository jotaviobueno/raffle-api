import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderStatusDto } from './create-order-status.dto';

export class UpdateOrderStatusDto extends PartialType(CreateOrderStatusDto) {
  id: string;
}
