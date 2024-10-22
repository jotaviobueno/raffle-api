import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, QueryParamsDto, UpdateUserDto } from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { UserService } from '../services/user.service';
import { IsPublic } from '../../auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { Permissions, Roles } from '../../role/decorators';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/common/enums';
import { RoleGuard } from '../../role/guards';

@Controller('user')
@ApiTags('user')
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN)
@UseGuards(RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @IsPublic()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Permissions(PERMISSION_ENUM.CAN_READ_USER)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.userService.findAll(queryParams);
  }

  @Get(':id')
  @Permissions(PERMISSION_ENUM.CAN_READ_USER)
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_USER)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update({ ...updateUserDto, id });
  }

  @Delete(':id')
  @Permissions(PERMISSION_ENUM.CAN_DELETE_USER)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
