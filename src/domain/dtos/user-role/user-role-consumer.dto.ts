import {
  AddressWithRelationsEntity,
  OrderCustomerEntity,
  PlanWithRelationsEntity,
} from 'src/domain/entities';

export class UserRoleConsumerDto {
  orderCustomer: OrderCustomerEntity;
  plans: PlanWithRelationsEntity[];
  address: AddressWithRelationsEntity;
}
