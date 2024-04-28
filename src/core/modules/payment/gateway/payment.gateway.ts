import { CreateCheckoutDto } from 'src/domain/dtos';
import { CartWithRelationsEntity } from 'src/domain/entities';

export abstract class PaymentGateway<T> {
  public abstract getCode(): string;
  public abstract setConfig(config: any): void;
  public abstract process(data: {
    cart: CartWithRelationsEntity;
    dto: CreateCheckoutDto;
  }): Promise<T>;
}
