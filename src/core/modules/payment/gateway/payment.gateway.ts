import { OrderWithRelationsEntity } from 'src/domain/entities';

export abstract class PaymentGateway {
  public abstract process(order: OrderWithRelationsEntity): Promise<boolean>;
}
