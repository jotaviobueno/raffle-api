import { PartialType } from '@nestjs/mapped-types';
import { CreateCartTotalDto } from './create-cart-total.dto';

export class UpdateCartTotalDto extends PartialType(CreateCartTotalDto) {
  id: string;
}
