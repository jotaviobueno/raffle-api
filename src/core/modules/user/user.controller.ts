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
} from '@nestjs/common';
import { CreateUserDto, QueryParamsDto, UpdateUserDto } from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { UserService } from './user.service';
import { IsPublic } from '../auth/decorators';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @IsPublic()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.userService.findAll(queryParams);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get(':id/seller')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15)
  findAllSellerByUserId(
    @Query() queryParams: QueryParamsDto,
    @Param('id') id: string,
  ) {
    return this.userService.findAllSellerByUserId({
      ...queryParams,
      userId: id,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update({ ...updateUserDto, id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
