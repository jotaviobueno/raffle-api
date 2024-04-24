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
  CreatePaymentGatewayConfigDto,
  SearchPaymentGatewayConfigDto,
  UpdatePaymentGatewayConfigDto,
} from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../../role/guards';
import { Roles } from '../../role/decorators';
import { ROLE_ENUM } from 'src/common/enums';
import { PaymentGatewayConfigService } from '../services/payment-gateway-config.service';

@Controller('payment-gateway-config')
@ApiTags('payment-gateway-config')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
export class PaymentGatewayConfigController {
  constructor(
    private readonly paymentGatewayConfigService: PaymentGatewayConfigService,
  ) {}

  @Post()
  create(@Body() createPaymentGatewayConfigDto: CreatePaymentGatewayConfigDto) {
    return this.paymentGatewayConfigService.create(
      createPaymentGatewayConfigDto,
    );
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  findAll(@Query() queryParams: SearchPaymentGatewayConfigDto) {
    return this.paymentGatewayConfigService.findAll(queryParams);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.paymentGatewayConfigService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentGatewayConfigDto: UpdatePaymentGatewayConfigDto,
  ) {
    return this.paymentGatewayConfigService.update({
      ...updatePaymentGatewayConfigDto,
      id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentGatewayConfigService.remove(id);
  }
}
