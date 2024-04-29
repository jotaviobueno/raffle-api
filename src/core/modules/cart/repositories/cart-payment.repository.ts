import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateCartPaymentDto } from 'src/domain/dtos';
import { CartPaymentEntity } from 'src/domain/entities';

@Injectable()
export class CartPaymentRepository extends RepositoryFactory<
  CartPaymentEntity,
  CreateCartPaymentDto & { method: string }
> {
  constructor() {
    super('cartPayment');
  }

  findByCartId(cartId: string): Promise<CartPaymentEntity | null> {
    return this.prismaService.cartPayment.findFirst({
      where: { cartId, deletedAt: null },
    });
  }
}
