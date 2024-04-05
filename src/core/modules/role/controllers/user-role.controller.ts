import {
  Controller,
  Body,
  Param,
  UseGuards,
  Post,
  Delete,
} from '@nestjs/common';
import { CreateUserRoleDto } from 'src/domain/dtos';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../guards';
import { UserRoleService } from '../services/user-role.service';
import { Roles } from '../decorators';
import { ROLE_ENUM } from 'src/common/enums';

@Controller('user-role')
@ApiTags('user-role')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(createUserRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRoleService.remove(id);
  }
}
