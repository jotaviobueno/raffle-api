import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from '../services/address.service';
import { CreateAddressDto, UpdateAddressDto } from 'src/domain/dtos';
import { ApiTags } from '@nestjs/swagger';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/common/enums';
import { Permissions, Roles } from '../../role/decorators';
import { RoleGuard } from '../../role/guards';

@Controller('address')
@ApiTags('address')
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN)
@UseGuards(RoleGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_CREATE_ADDRESS)
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get(':id')
  @Permissions(PERMISSION_ENUM.CAN_READ_ADDRESS)
  findById(@Param('id') id: string) {
    return this.addressService.findById(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_ADDRESS)
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update({ ...updateAddressDto, id });
  }

  @Delete(':id')
  @Permissions(PERMISSION_ENUM.CAN_DELETE_ADDRESS)
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}
