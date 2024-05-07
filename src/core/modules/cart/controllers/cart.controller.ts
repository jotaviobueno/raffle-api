import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateCartDto } from 'src/domain/dtos';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CartService } from '../services/cart.service';
import { CartEntity } from 'src/domain/entities';

@Controller('cart')
@ApiTags('cart')
@ApiBearerAuth('defaultBearerAuth')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiCreatedResponse({ type: CartEntity })
  @ApiBody({ type: CreateCartDto })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: Boolean })
  @ApiNotAcceptableResponse()
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
