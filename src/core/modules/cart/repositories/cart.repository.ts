import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateCartDto } from 'src/domain/dtos';
import {
  CartCouponEntity,
  CartEntity,
  CartItemEntity,
  CartTotalEntity,
  CartWithRelationsEntity,
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

  findByCustomerIdAndSellerId(
    customerId: string,
    sellerId: string,
  ): Promise<CartEntity | null> {
    return this.prismaService.cart.findFirst({
      where: {
        customerId,
        sellerId,
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
        cartPayment: {
          include: {
            address: true,
            paymentMethod: true,
          },
        },
        seller: true,
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            document: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            avatar: true,
          },
        },
      },
    });
  }

  findById(id: string): Promise<CartWithRelationsEntity | null> {
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
        cartPayment: {
          include: {
            address: true,
            paymentMethod: true,
          },
        },
        seller: true,
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            document: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            avatar: true,
          },
        },
      },
    });
  }
}
