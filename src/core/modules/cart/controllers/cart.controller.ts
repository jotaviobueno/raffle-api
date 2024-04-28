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
import { CurrentUser } from '../../user/decorators';
import { CartEntity, UserEntity } from 'src/domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';

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

  @Get()
  @ApiUnauthorizedResponse()
  @ApiOkFindAllResult(UserEntity)
  findAll(
    @CurrentUser() user: UserEntity,
    @Query() queryParams: QueryParamsDto,
  ) {
    return this.cartService.findAll({ ...queryParams, customerId: user.id });
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
