import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateCartPaymentDto } from 'src/domain/dtos';
import { CartPaymentEntity } from 'src/domain/entities';
import { PaymentMethodService } from '../../payment/services/payment-method.service';
import { AddressService } from '../../user/services/address.service';
import { CartPaymentRepository } from '../repositories/cart-payment.repository';
import { CartService } from './cart.service';
import { CartTotalService } from './cart-total.service';

@Injectable()
export class CartPaymentService
  implements ServiceBase<CartPaymentEntity, CreateCartPaymentDto>
{
  constructor(
    private readonly paymentMethodService: PaymentMethodService,
    private readonly addressService: AddressService,
    private readonly cartService: CartService,
    private readonly cartTotalService: CartTotalService,
    private readonly cartPaymentRepository: CartPaymentRepository,
  ) {}

  async create(dto: CreateCartPaymentDto): Promise<CartPaymentEntity> {
    const cart = await this.cartService.findById(dto.cartId);

    if (cart.cartItems.length === 0)
      throw new HttpException('Empty cart.', HttpStatus.UNPROCESSABLE_ENTITY);

    const paymentMethod = await this.paymentMethodService.findById(
      dto.paymentMethodId,
    );

    const address = await this.addressService.findById(dto.addressId);

    const cartAlreadyHavePaymentMethod =
      await this.cartPaymentRepository.findByCartId(cart.id);

    const cartPayment = await this.cartPaymentRepository.upsert({
      id: cartAlreadyHavePaymentMethod?.id
        ? cartAlreadyHavePaymentMethod?.id
        : '',
      cartId: cart.id,
      paymentMethodId: paymentMethod.id,
      addressId: address.id,
      method: paymentMethod.name,
    });

    await this.cartTotalService.update({
      id: cart.cartTotal.id,
      total: cart.cartTotal.total,
    });

    return cartPayment;
  }
}
