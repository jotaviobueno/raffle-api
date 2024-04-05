import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';
import { SearchRoleDto } from 'src/domain/dtos/role/search-role.dto';
import { RoleService } from '../services/role.service';
import { RoleGuard } from '../guards';
import { IsPublic } from '../../auth/decorators';
import { Roles } from '../decorators';
import { ROLE_ENUM } from 'src/common/enums';

@Controller('role')
@ApiTags('role')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
export class RoleController {
  constructor(private readonly roleRepository: RoleService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  @IsPublic()
  findAll(@Query() queryParams: SearchRoleDto) {
    return this.roleRepository.findAll(queryParams);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.roleRepository.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.roleRepository.update({ ...updateUserDto, id });
  }
}
