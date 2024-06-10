import { CartWithRelationsEntity } from 'src/domain/entities';
import { CreateCheckoutDto } from '../../order';

export class AsaasGatewayDto {
  dto: CreateCheckoutDto;
  cart: CartWithRelationsEntity;
}
