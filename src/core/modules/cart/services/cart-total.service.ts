import { Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateCartTotalDto, UpdateCartTotalDto } from 'src/domain/dtos';
import { CartTotalEntity } from 'src/domain/entities';
import { CartTotalRepository } from '../repositories/cart-total.repository';

@Injectable()
export class CartTotalService
  implements
    ServiceBase<CartTotalEntity, CreateCartTotalDto, UpdateCartTotalDto>
{
  constructor(private readonly cartTotalRepository: CartTotalRepository) {}

  create(dto: CreateCartTotalDto): Promise<CartTotalEntity> {
    return this.cartTotalRepository.create(dto);
  }

  update(dto: UpdateCartTotalDto): Promise<CartTotalEntity> {
    return this.cartTotalRepository.update(dto);
  }
}
