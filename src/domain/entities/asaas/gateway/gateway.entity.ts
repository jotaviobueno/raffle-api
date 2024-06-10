import { CartWithRelationsEntity } from '../../cart';
import { AsaasCustomerEntity } from '../customer';
import { AsaasPaymentEntity } from '../payment';
import { AsaasSubscriptionEntity } from '../subscription';

export class AsaasGatewayEntity {
  cart: CartWithRelationsEntity;
  data: AsaasPaymentEntity | AsaasSubscriptionEntity;
  customer: AsaasCustomerEntity;
}
