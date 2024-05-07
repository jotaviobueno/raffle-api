import { PartialType } from '@nestjs/mapped-types';
import { CreateCartItemDto } from './create-cart-item.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateCartItemDto extends PartialType(
  OmitType(CreateCartItemDto, ['cartId', 'raffleId']),
) {
  id: string;
}
