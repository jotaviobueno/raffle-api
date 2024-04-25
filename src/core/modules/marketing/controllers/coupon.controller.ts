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
  CreateCouponDto,
  SearchCouponDto,
  UpdateCouponDto,
} from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators';
import { RoleGuard } from '../../role/guards';
import { Roles } from '../../role/decorators';
import { ROLE_ENUM } from 'src/common/enums';
import { CouponService } from '../services/coupon.service';

@Controller('coupon')
@ApiTags('coupon')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  @IsPublic()
  findAll(@Query() queryParams: SearchCouponDto) {
    return this.couponService.findAll(queryParams);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.couponService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update({ ...updateCouponDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.remove(id);
  }
}
