import { Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateCartPaymentDto } from 'src/domain/dtos';
import { CartPaymentEntity } from 'src/domain/entities';
import { PaymentMethodService } from '../../payment/services/payment-method.service';
import { AddressService } from '../../user/services/address.service';
import { CartPaymentRepository } from '../repositories/cart-payment.repository';
import { CartService } from './cart.service';
import { CartTotalService } from './cart-total.service';
import { asaasCalculateFeeUtil } from 'src/common/utils';

@Injectable()
export class CartPaymentService
  implements ServiceBase<CartPaymentEntity, CreateCartPaymentDto>
{
  constructor(
    private readonly paymentMethodService: PaymentMethodService,
    private readonly addressService: AddressService,
    private readonly cartPaymentRepository: CartPaymentRepository,
    private readonly cartService: CartService,
    private readonly cartTotalService: CartTotalService,
  ) {}

  async create(dto: CreateCartPaymentDto): Promise<CartPaymentEntity> {
    const cart = await this.cartService.findById(dto.cartId);

    const paymentMethod = await this.paymentMethodService.findById(
      dto.paymentMethodId,
    );

    const address = await this.addressService.findById(dto.addressId);

    const cartPayment = await this.cartPaymentRepository.create({
      cartId: cart.id,
      paymentMethodId: paymentMethod.id,
      addressId: address.id,
      method: paymentMethod.name,
    });

    const fee = asaasCalculateFeeUtil(paymentMethod, cart.cartTotal.total);

    await this.cartTotalService.update({
      id: cart.cartTotal.id,
      fee,
      total: cart.cartTotal.total + fee,
    });

    return cartPayment;
  }
}
