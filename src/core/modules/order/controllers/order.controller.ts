import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateOrderDto } from 'src/domain/dtos';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../user/decorators';
import { UserEntity } from 'src/domain/entities';
import { OrderService } from '../services/order.service';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: UserEntity,
    @Req() req: Request,
  ) {
    return this.orderService.create({
      ...createOrderDto,
      customerId: user.id,
      userAgent: req.headers['user-agent'],
      ip: req.headers['x-forwarded-for'],
    });
  }
}
