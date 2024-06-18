import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateCartDto } from 'src/domain/dtos';
import { CartEntity, CartWithRelationsEntity } from 'src/domain/entities';
import { CartRepository } from '../repositories/cart.repository';
import { UserService } from '../../user/services/user.service';
import { CartTotalService } from './cart-total.service';

@Injectable()
export class CartService implements ServiceBase<CartEntity, CreateCartDto> {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly userService: UserService,
    private readonly cartTotalService: CartTotalService,
  ) {}

  async create(dto: CreateCartDto): Promise<CartWithRelationsEntity> {
    const customer = await this.userService.findById(dto.customerId);

    const customerAlreadyHaveCart =
      await this.cartRepository.findByCustomerIdAndSellerId(
        customer.id,
        dto.sellerId,
      );

    if (customerAlreadyHaveCart) return customerAlreadyHaveCart;

    const cart = await this.cartRepository.create(dto);

    await this.cartTotalService.create({
      cartId: cart.id,
      discount: 0,
      discountManual: 0,
      shipping: 0,
      subtotal: 0,
      total: 0,
    });

    return cart;
  }

  async findById(id: string): Promise<CartWithRelationsEntity> {
    const cart = await this.cartRepository.findById(id);

    if (!cart) throw new HttpException('cart not found', HttpStatus.NOT_FOUND);

    return cart;
  }

  async remove(id: string): Promise<boolean> {
    const cart = await this.findById(id);

    const remove = await this.cartRepository.softDelete(cart.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
