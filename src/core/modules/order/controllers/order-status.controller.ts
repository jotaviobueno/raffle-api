import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateOrderStatusDto,
  SearchOrderStatusDto,
  UpdateOrderStatusDto,
} from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators';
import { RoleGuard } from '../../role/guards';
import { Roles } from '../../role/decorators';
import { ROLE_ENUM } from 'src/common/enums';
import { OrderStatusService } from '../services/order-status.service';

@Controller('order-status')
@ApiTags('order-status')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @Post()
  create(@Body() createOrderStatusDto: CreateOrderStatusDto) {
    return this.orderStatusService.create(createOrderStatusDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  @IsPublic()
  findAll(@Query() queryParams: SearchOrderStatusDto) {
    return this.orderStatusService.findAll(queryParams);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.orderStatusService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderStatusService.update({ ...updateOrderStatusDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderStatusService.remove(id);
  }
}
