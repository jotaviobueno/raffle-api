import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateCartDto } from 'src/domain/dtos';
import {
  CartCouponEntity,
  CartEntity,
  CartItemEntity,
  CartTotalEntity,
  QueryBuilderEntity,
} from 'src/domain/entities';

@Injectable()
export class CartRepository extends RepositoryFactory<
  CartEntity,
  CreateCartDto
> {
  constructor() {
    super('cart');
  }

  findByCustomerId(customerId: string): Promise<CartEntity | null> {
    return this.prismaService.cart.findFirst({
      where: {
        customerId,
        deletedAt: null,
      },
    });
  }

  findAll(query: QueryBuilderEntity): Promise<
    (CartEntity & {
      cartTotal: CartTotalEntity;
      cartItems: CartItemEntity[];
      cartCoupons: CartCouponEntity[];
    })[]
  > {
    return this.prismaService.cart.findMany({
      ...query,
      include: {
        cartTotal: {
          where: {
            deletedAt: null,
          },
        },
        cartItems: {
          where: {
            deletedAt: null,
          },
        },
        cartCoupons: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }

  findById(id: string): Promise<
    | (CartEntity & {
        cartTotal: CartTotalEntity;
        cartItems: CartItemEntity[];
        cartCoupons: CartCouponEntity[];
      })
    | null
  > {
    return this.prismaService.cart.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        cartTotal: {
          where: {
            deletedAt: null,
          },
        },
        cartItems: {
          where: {
            deletedAt: null,
          },
        },
        cartCoupons: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }
}
