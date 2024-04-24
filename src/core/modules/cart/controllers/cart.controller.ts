import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCartDto, QueryParamsDto } from 'src/domain/dtos';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from '../services/cart.service';
import { CurrentUser } from '../../user/decorators';
import { UserEntity } from 'src/domain/entities';

@Controller('cart')
@ApiTags('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  findAll(
    @CurrentUser() user: UserEntity,
    @Query() queryParams: QueryParamsDto,
  ) {
    return this.cartService.findAll({ ...queryParams, customerId: user.id });
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
