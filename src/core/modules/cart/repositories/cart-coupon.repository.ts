import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateCartCouponDto } from 'src/domain/dtos';
import {
  CartCouponEntity,
  CartEntity,
  CartTotalEntity,
  CouponEntity,
} from 'src/domain/entities';

@Injectable()
export class CartCouponRepository extends RepositoryFactory<
  CartCouponEntity,
  CreateCartCouponDto & {
    code: string;
    discount?: number;
    shipping?: number;
    couponId: string;
  }
> {
  constructor() {
    super('cartCoupon');
  }

  findById(id: string): Promise<
    | (CartCouponEntity & {
        cart: CartEntity & { cartTotal: CartTotalEntity };
      })
    | null
  > {
    return this.prismaService.cartCoupon.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        cart: {
          include: {
            cartTotal: true,
          },
        },
      },
    });
  }
}
