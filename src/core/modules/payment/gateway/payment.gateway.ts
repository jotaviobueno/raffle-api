import { CreateCheckoutDto } from 'src/domain/dtos';
import { OrderWithRelationsEntity } from 'src/domain/entities';

export abstract class PaymentGateway<T> {
  public abstract getCode(): string;
  public abstract setConfig(config: any): void;
  public abstract process(data: {
    order: OrderWithRelationsEntity;
    dto: CreateCheckoutDto;
  }): Promise<T>;
}
