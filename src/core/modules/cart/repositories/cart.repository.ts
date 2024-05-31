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
  cartQueryWithRelations,
} from 'src/domain/entities';

@Injectable()
export class CartRepository extends RepositoryFactory<
  CartEntity,
  CreateCartDto
> {
  constructor() {
    super('cart');
  }

  create(data: CreateCartDto): Promise<CartWithRelationsEntity> {
    return this.prismaService.cart.create({
      data,
      include: {
        ...cartQueryWithRelations,
      },
    });
  }

  findByCustomerIdAndSellerId(
    customerId: string,
    sellerId: string,
  ): Promise<CartWithRelationsEntity | null> {
    return this.prismaService.cart.findFirst({
      where: {
        customerId,
        sellerId,
        deletedAt: null,
      },
      include: {
        ...cartQueryWithRelations,
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
            paymentMethod: true,
          },
        },
        seller: true,
        customer: {
          select: {
            id: true,
            name: true,
            mobilePhone: true,
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
        ...cartQueryWithRelations,
      },
    });
  }
}
