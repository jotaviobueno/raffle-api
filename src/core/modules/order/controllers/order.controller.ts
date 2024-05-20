import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators';
import { OrderService } from '../services/order.service';
import { CreateCheckoutDto, SearchOrderDto } from 'src/domain/dtos';
import { OrderEntity, OrderWithRelationsEntity } from 'src/domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiCreatedResponse({ type: OrderWithRelationsEntity })
  @ApiBody({ type: CreateCheckoutDto })
  @ApiInternalServerErrorResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  create(@Body() createCheckoutDto: CreateCheckoutDto, @Req() req: Request) {
    return this.orderService.create({
      ...createCheckoutDto,
      userAgent: req.headers['user-agent'],
      ip: req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'],
    });
  }

  @Post('asaas-postback')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  asaasPostback(@Body() data) {
    return this.orderService.asaasPostback(data);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  @ApiOkFindAllResult(OrderEntity)
  findAll(@Query() queryParams: SearchOrderDto) {
    return this.orderService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOkResponse({ type: OrderWithRelationsEntity })
  @IsPublic()
  @CacheTTL(30)
  @ApiNotFoundResponse()
  findById(@Param('id') id: string) {
    return this.orderService.findById(id);
  }
}
