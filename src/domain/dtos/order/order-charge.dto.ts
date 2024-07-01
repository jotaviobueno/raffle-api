import { OrderStatus } from '@prisma/client';
import { AsaasEventDto, OrderWithRelationsEntity } from 'src/domain/entities';

export class OrderChargeDto {
  order: OrderWithRelationsEntity;
  orderStatus: OrderStatus;
  data: AsaasEventDto;
}
