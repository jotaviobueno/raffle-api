import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateCartItemDto } from 'src/domain/dtos';
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
import { CartItemService } from '../services/cart-item.service';
import { CartItemEntity } from 'src/domain/entities';

@Controller('cart-item')
@ApiTags('cart-item')
@ApiBearerAuth('defaultBearerAuth')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  @ApiCreatedResponse({ type: CartItemEntity })
  @ApiBody({ type: CreateCartItemDto })
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.create(createCartItemDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Boolean })
  @ApiNotAcceptableResponse()
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  remove(@Param('id') id: string) {
    return this.cartItemService.remove(id);
  }
}
