import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateCartCouponDto } from 'src/domain/dtos';
import {
  CartCouponEntity,
  CartEntity,
  CartTotalEntity,
} from 'src/domain/entities';
import { CartService } from './cart.service';
import { CouponService } from '../../marketing/services/coupon.service';
import { CartCouponRepository } from '../repositories/cart-coupon.repository';
import { format } from 'date-fns';
import { CartTotalService } from './cart-total.service';

@Injectable()
export class CartCouponService
  implements ServiceBase<CartCouponEntity, CreateCartCouponDto>
{
  constructor(
    private readonly cartService: CartService,
    private readonly couponService: CouponService,
    private readonly cartCouponRepository: CartCouponRepository,
    private readonly cartTotalService: CartTotalService,
  ) {}

  async create(dto: CreateCartCouponDto): Promise<CartCouponEntity> {
    const coupon = await this.couponService.findByCode(dto.code);

    const cart = await this.cartService.findById(dto.cartId);

    if (cart.cartItems.length === 0)
      throw new HttpException('Empty cart.', HttpStatus.UNPROCESSABLE_ENTITY);

    if (cart.cartCoupon)
      throw new HttpException(
        'You have already applied a coupon to this cart.',
        HttpStatus.CONFLICT,
      );

    if (new Date() <= coupon.from)
      throw new HttpException(
        `Coupon not valid, this coupon will be valid from ${format(
          coupon.from,
          'dd/MM/yy',
        )}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    if (new Date() >= coupon.to)
      throw new HttpException(
        'Expired coupon.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    if (coupon.raffleCoupons.length > 0) {
      for (const cartItem of cart.cartItems) {
        if (
          coupon.raffleCoupons.some(
            (raffleCoupon) => cartItem.raffleId != raffleCoupon.raffleId,
          )
        )
          throw new HttpException(
            `This cart-item: ${cartItem.id} not accept in this coupon`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
      }
    }

    if (coupon.usages >= coupon.maxUsages)
      throw new HttpException(
        'Coupon has already exceeded its maximum number of uses.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const cartCoupon = await this.cartCouponRepository.create({
      cartId: cart.id,
      couponId: coupon.id,
      code: coupon.code,
      discount: coupon.discount,
      shipping: coupon.shipping,
    });

    await this.cartTotalService.update({
      id: cart.cartTotal.id,
      discount: coupon.discount,
      shipping: coupon.shipping,
      total: cart.cartTotal.total - coupon.discount,
    });

    return cartCoupon;
  }

  async findById(id: string): Promise<
    CartCouponEntity & {
      cart: CartEntity & { cartTotal: CartTotalEntity };
    }
  > {
    const coupon = await this.cartCouponRepository.findById(id);

    if (!coupon)
      throw new HttpException('Cart coupon not found', HttpStatus.NOT_FOUND);

    return coupon;
  }

  async remove(id: string): Promise<boolean> {
    const coupon = await this.findById(id);

    const remove = await this.cartCouponRepository.softDelete(coupon.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    await this.cartTotalService.update({
      id: coupon.cart.cartTotal.id,
      discount: coupon.cart.cartTotal.discount - coupon.discount,
      shipping: coupon.cart.cartTotal.discount - coupon.shipping,
      total: coupon.cart.cartTotal.total + coupon.discount,
    });

    return true;
  }
}
