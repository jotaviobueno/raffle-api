import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateCartCouponDto } from 'src/domain/dtos';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CartCouponService } from '../services/cart-coupon.service';
import { CartCouponEntity } from 'src/domain/entities';

@Controller('cart-coupon')
@ApiTags('cart-coupon')
@ApiBearerAuth('defaultBearerAuth')
export class CartCouponController {
  constructor(private readonly cartCouponService: CartCouponService) {}

  @Post()
  @ApiCreatedResponse({ type: CartCouponEntity })
  @ApiBody({ type: CreateCartCouponDto })
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  @ApiUnauthorizedResponse()
  create(@Body() createCartCouponDto: CreateCartCouponDto) {
    return this.cartCouponService.create(createCartCouponDto);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  remove(@Param('id') id: string) {
    return this.cartCouponService.remove(id);
  }
}
