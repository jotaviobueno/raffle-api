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
import { IsPublic } from '../../auth/decorators';
import { RoleGuard } from '../../role/guards';
import { Permissions, Roles } from '../../role/decorators';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/common/enums';
import { OrderStatusService } from '../services/order-status.service';
import { OrderStatusEntity } from 'src/domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';

@Controller('order-status')
@ApiTags('order-status')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
@ApiBearerAuth('defaultBearerAuth')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_CREATE_ORDER_STATUS)
  @ApiCreatedResponse({ type: OrderStatusEntity })
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiBody({ type: CreateOrderStatusDto })
  create(@Body() createOrderStatusDto: CreateOrderStatusDto) {
    return this.orderStatusService.create(createOrderStatusDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  @IsPublic()
  @ApiOkFindAllResult(OrderStatusEntity)
  findAll(@Query() queryParams: SearchOrderStatusDto) {
    return this.orderStatusService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOkResponse({ type: OrderStatusEntity })
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @IsPublic()
  findById(@Param('id') id: string) {
    return this.orderStatusService.findById(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_ORDER_STATUS)
  @ApiOkResponse({ type: OrderStatusEntity })
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiBody({ type: UpdateOrderStatusDto })
  @ApiNotAcceptableResponse()
  update(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderStatusService.update({ ...updateOrderStatusDto, id });
  }

  @Delete(':id')
  @Permissions(PERMISSION_ENUM.CAN_DELETE_ORDER_STATUS)
  @ApiOkResponse({ type: Boolean })
  @ApiUnauthorizedResponse()
  @ApiNotAcceptableResponse()
  @ApiNotFoundResponse()
  remove(@Param('id') id: string) {
    return this.orderStatusService.remove(id);
  }
}
