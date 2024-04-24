import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateCartItemDto } from 'src/domain/dtos';
import { ApiTags } from '@nestjs/swagger';
import { CartItemService } from '../services/cart-item.service';

@Controller('cart-item')
@ApiTags('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.create(createCartItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartItemService.remove(id);
  }
}
