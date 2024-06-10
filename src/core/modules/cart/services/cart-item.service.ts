import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateCartItemDto, UpdateCartItemDto } from 'src/domain/dtos';
import {
  CartEntity,
  CartItemEntity,
  CartTotalEntity,
} from 'src/domain/entities';
import { CartItemRepository } from '../repositories/cart-item.repository';
import { RaffleService } from '../../catalog/services/raffle.service';
import { CartService } from './cart.service';
import { CartTotalService } from './cart-total.service';
import { PlanService } from '../../plan/services/plan.service';

@Injectable()
export class CartItemService
  implements ServiceBase<CartItemEntity, CreateCartItemDto, UpdateCartItemDto>
{
  constructor(
    private readonly cartItemRepository: CartItemRepository,
    private readonly cartService: CartService,
    private readonly raffleService: RaffleService,
    private readonly cartTotalService: CartTotalService,
    private readonly planService: PlanService,
  ) {}

  async create(dto: CreateCartItemDto): Promise<CartItemEntity> {
    const cart = await this.cartService.findById(dto.cartId);

    if (dto.raffleId) {
      const raffle = await this.raffleService.findById(dto.raffleId);

      if (
        new Date() > raffle.drawDateAt ||
        raffle.progressPercentage >= 100 ||
        raffle.payeds >= raffle.totalNumbers ||
        raffle.isFinished
      )
        throw new HttpException(
          'Raffle has already been completed',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );

      if (dto.quantity < raffle.minBuyQuotas)
        throw new HttpException(
          'Minimum purchase exceeded',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );

      if (dto.quantity > raffle.maxBuyQuotas)
        throw new HttpException(
          'Maximum purchase exceeded',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );

      const raffleAlreadyExistInCart = cart.cartItems.find(
        (item) => item.raffleId === raffle.id,
      );

      if (
        raffle.payeds + dto.quantity > raffle.totalNumbers ||
        ((raffle.payeds + dto.quantity) / raffle.totalNumbers) * 100 > 100
      )
        throw new HttpException(
          'You need to decrease your order quantity',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );

      if (raffleAlreadyExistInCart) {
        const cartItem = await this.cartItemRepository.update({
          id: raffleAlreadyExistInCart.id,
          price: raffle.price,
          quantity: raffleAlreadyExistInCart.quantity + dto.quantity,
          tax: raffleAlreadyExistInCart.tax + raffle.tax,
          total: dto.quantity * raffle.price + raffleAlreadyExistInCart.total,
        });

        await this.cartTotalService.update({
          id: cart.cartTotal.id,
          total:
            dto.quantity * raffle.price + cart.cartTotal.total + cartItem.tax,
          subtotal: dto.quantity * raffle.price + cart.cartTotal.subtotal,
          tax: cart.cartTotal.tax + cartItem.tax,
        });

        return cartItem;
      } else {
        const cartItem = await this.cartItemRepository.create({
          cartId: cart.id,
          raffleId: raffle.id,
          price: raffle.price,
          quantity: dto.quantity,
          tax: raffle.tax,
          total: dto.quantity * raffle.price,
        });

        await this.cartTotalService.update({
          id: cart.cartTotal.id,
          total:
            dto.quantity * raffle.price + cart.cartTotal.total + cartItem.tax,
          subtotal: dto.quantity * raffle.price + cart.cartTotal.subtotal,
          tax: cart.cartTotal.tax + cartItem.tax,
        });

        return cartItem;
      }
    }

    if (dto.planId) {
      if (dto.quantity > 1)
        throw new HttpException('Invalid quantity', HttpStatus.BAD_REQUEST);

      const plan = await this.planService.findById(dto.planId);

      const planAlreadyExistInCart = cart.cartItems.find(
        (item) => item.planId === plan.id,
      );

      if (planAlreadyExistInCart)
        throw new HttpException(
          'Plan already exist in cart',
          HttpStatus.CONFLICT,
        );

      const cartItem = await this.cartItemRepository.create({
        cartId: cart.id,
        planId: plan.id,
        price: plan.price,
        quantity: dto.quantity,
        tax: plan.tax,
        total: dto.quantity * plan.price,
      });

      await this.cartTotalService.update({
        id: cart.cartTotal.id,
        total: dto.quantity * plan.price + cart.cartTotal.total + cartItem.tax,
        subtotal: dto.quantity * plan.price + cart.cartTotal.subtotal,
        tax: cart.cartTotal.tax + cartItem.tax,
      });

      return cartItem;
    }

    throw new HttpException('Invalid cart item', HttpStatus.BAD_REQUEST);
  }

  async findById(
    id: string,
  ): Promise<
    CartItemEntity & { cart: CartEntity & { cartTotal: CartTotalEntity } }
  > {
    const cartItem = await this.cartItemRepository.findById(id);

    if (!cartItem)
      throw new HttpException('Cart item not found', HttpStatus.NOT_FOUND);

    return cartItem;
  }

  async remove(id: string): Promise<boolean> {
    const cartItem = await this.findById(id);

    const remove = await this.cartItemRepository.softDelete(cartItem.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    await this.cartTotalService.update({
      id: cartItem.cart.cartTotal.id,
      total: cartItem.cart.cartTotal.total - cartItem.total,
      subtotal: cartItem.cart.cartTotal.total - cartItem.total,
    });

    return true;
  }
}
