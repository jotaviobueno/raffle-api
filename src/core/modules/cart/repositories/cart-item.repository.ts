import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateCartItemDto, UpdateCartItemDto } from 'src/domain/dtos';
import {
  CartEntity,
  CartItemEntity,
  CartTotalEntity,
} from 'src/domain/entities';

@Injectable()
export class CartItemRepository extends RepositoryFactory<
  CartItemEntity,
  CreateCartItemDto,
  UpdateCartItemDto
> {
  constructor() {
    super('cartItem');
  }

  findById(
    id: string,
  ): Promise<
    | (CartItemEntity & { cart: CartEntity & { cartTotal: CartTotalEntity } })
    | null
  > {
    return this.prismaService.cartItem.findFirst({
      where: { id, deletedAt: null },
      include: {
        cart: {
          include: { cartTotal: true },
        },
      },
    });
  }
}
