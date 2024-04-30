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
  CreatePaymentMethodDto,
  QueryParamsDto,
  UpdateAwardDto,
} from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';
import { PaymentMethodService } from '../services/payment-method.service';
import { RoleGuard } from '../../role/guards';
import { Permissions, Roles } from '../../role/decorators';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/common/enums';
import { IsPublic } from '../../auth/decorators';

@Controller('payment-method')
@ApiTags('payment-method')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_CREATE_PAYMENT_METHOD)
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  @IsPublic()
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.paymentMethodService.findAll(queryParams);
  }

  @Get(':id')
  @IsPublic()
  findById(@Param('id') id: string) {
    return this.paymentMethodService.findById(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_PAYMENT_METHOD)
  update(@Param('id') id: string, @Body() updateAwardDto: UpdateAwardDto) {
    return this.paymentMethodService.update({ ...updateAwardDto, id });
  }

  @Delete(':id')
  @Permissions(PERMISSION_ENUM.CAN_DELETE_PAYMENT_METHOD)
  remove(@Param('id') id: string) {
    return this.paymentMethodService.remove(id);
  }
}
