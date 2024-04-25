import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateCartCouponDto } from 'src/domain/dtos';
import { ApiTags } from '@nestjs/swagger';
import { CartCouponService } from '../services/cart-coupon.service';

@Controller('cart-coupon')
@ApiTags('cart-coupon')
export class CartCouponController {
  constructor(private readonly cartCouponService: CartCouponService) {}

  @Post()
  create(@Body() createCartCouponDto: CreateCartCouponDto) {
    return this.cartCouponService.create(createCartCouponDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.cartCouponService.remove(id);
  }
}
