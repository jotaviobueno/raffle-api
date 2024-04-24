import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateCartItemDto } from 'src/domain/dtos';
import {
  CartEntity,
  CartItemEntity,
  CartTotalEntity,
} from 'src/domain/entities';
import { CartItemRepository } from '../repositories/cart-item.repository';
import { RaffleService } from '../../catalog/services/raffle.service';
import { CartService } from './cart.service';
import { CartTotalService } from './cart-total.service';

@Injectable()
export class CartItemService
  implements ServiceBase<CartItemEntity, CreateCartItemDto>
{
  constructor(
    private readonly cartItemRepository: CartItemRepository,
    private readonly cartService: CartService,
    private readonly raffleService: RaffleService,
    private readonly cartTotalService: CartTotalService,
  ) {}

  async create(dto: CreateCartItemDto): Promise<CartItemEntity> {
    const cart = await this.cartService.findById(dto.cartId);

    const raffle = await this.raffleService.findById(dto.raffleId);

    const cartItem = await this.cartItemRepository.create({
      cartId: cart.id,
      raffleId: raffle.id,
      price: raffle.price,
      quantity: dto.quantity,
      tax: 0,
      total: dto.quantity * raffle.price,
    });

    await this.cartTotalService.update({
      id: cart.cartTotal.id,
      total: dto.quantity * raffle.price + cart.cartTotal.total,
      subtotal: dto.quantity * raffle.price + cart.cartTotal.total,
    });

    return cartItem;
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
