import {
  Controller,
  Get,
  Param,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { SearchCustomerSellerDto } from 'src/domain/dtos';
import { ApiTags } from '@nestjs/swagger';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/common/enums';
import { Permissions, Roles } from '../../role/decorators';
import { RoleGuard } from '../../role/guards';
import { CustomerSellerService } from '../services/customer-seller.service';

@Controller('customer-seller')
@ApiTags('customer-seller')
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
@UseGuards(RoleGuard)
export class CustomerSellerController {
  constructor(private readonly customerSellerService: CustomerSellerService) {}

  @Get(':id')
  @Permissions(PERMISSION_ENUM.CAN_READ_CUSTOMER_SELLER)
  findById(@Param('id') id: string) {
    return this.customerSellerService.findById(id);
  }

  @Get()
  @Permissions(PERMISSION_ENUM.CAN_READ_CUSTOMER_SELLER)
  findAll(@Query() queryParams: SearchCustomerSellerDto) {
    return this.customerSellerService.findAll(queryParams);
  }

  @Delete(':id')
  @Permissions(PERMISSION_ENUM.CAN_DELETE_CUSTOMER_SELLER)
  remove(@Param('id') id: string) {
    return this.customerSellerService.remove(id);
  }
}
