import { Body, Controller, Post } from '@nestjs/common';
import { CreateCartPaymentDto } from 'src/domain/dtos';
import { ApiTags } from '@nestjs/swagger';
import { CartPaymentService } from '../services/cart-payment.service';

@Controller('cart-payment')
@ApiTags('cart-payment')
export class CartPaymentController {
  constructor(private readonly cartPaymentService: CartPaymentService) {}

  @Post()
  create(@Body() createCartPaymentDto: CreateCartPaymentDto) {
    return this.cartPaymentService.create(createCartPaymentDto);
  }
}
