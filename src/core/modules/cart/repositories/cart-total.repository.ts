import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateCartTotalDto, UpdateCartTotalDto } from 'src/domain/dtos';
import { CartTotalEntity } from 'src/domain/entities';

@Injectable()
export class CartTotalRepository extends RepositoryFactory<
  CartTotalEntity,
  CreateCartTotalDto,
  UpdateCartTotalDto
> {
  constructor() {
    super('cartTotal');
  }

  findByCartId(cartId: string): Promise<CartTotalEntity | null> {
    return this.prismaService.cartTotal.findFirst({
      where: {
        cartId,
      },
    });
  }
}
