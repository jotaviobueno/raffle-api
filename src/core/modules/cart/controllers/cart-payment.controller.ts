import { Body, Controller, Post } from '@nestjs/common';
import { CreateCartPaymentDto } from 'src/domain/dtos';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CartPaymentService } from '../services/cart-payment.service';
import { CartPaymentEntity } from 'src/domain/entities';

@Controller('cart-payment')
@ApiTags('cart-payment')
@ApiBearerAuth('defaultBearerAuth')
export class CartPaymentController {
  constructor(private readonly cartPaymentService: CartPaymentService) {}

  @Post()
  @ApiCreatedResponse({ type: CartPaymentEntity })
  @ApiBody({ type: CartPaymentEntity })
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  create(@Body() createCartPaymentDto: CreateCartPaymentDto) {
    return this.cartPaymentService.create(createCartPaymentDto);
  }
}
