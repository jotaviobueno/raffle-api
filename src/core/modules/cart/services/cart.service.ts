import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateCartDto, SearchCartDto } from 'src/domain/dtos';
import {
  CartEntity,
  CartWithRelationsEntity,
  FindAllResultEntity,
} from 'src/domain/entities';
import { CartRepository } from '../repositories/cart.repository';
import { UserService } from '../../user/services/user.service';
import { CartTotalService } from './cart-total.service';
import { QueryBuilder } from 'src/common/utils';

@Injectable()
export class CartService implements ServiceBase<CartEntity, CreateCartDto> {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly userService: UserService,
    private readonly cartTotalService: CartTotalService,
  ) {}

  async create(dto: CreateCartDto): Promise<CartEntity> {
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
      fee: 0,
    });

    return cart;
  }

  async findById(id: string): Promise<CartWithRelationsEntity> {
    const cart = await this.cartRepository.findById(id);

    if (!cart) throw new HttpException('cart not found', HttpStatus.NOT_FOUND);

    return cart;
  }

  async findAll({
    customerId,
    ...queryParams
  }: SearchCartDto): Promise<FindAllResultEntity<CartEntity>> {
    const query = new QueryBuilder(queryParams)
      .where({
        customerId: customerId && customerId,
      })
      .sort()
      .pagination()
      .handle();

    const sellers = await this.cartRepository.findAll(query);
    const total = await this.cartRepository.count(query.where);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.pageSize),
      pageSize: queryParams.pageSize,
      total,
    };

    return { data: sellers, info };
  }

  async remove(id: string): Promise<boolean> {
    const cart = await this.findById(id);

    const remove = await this.cartRepository.softDelete(cart.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
