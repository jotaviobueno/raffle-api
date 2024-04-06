import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from '../user/decorators';
import { IsPublic } from './decorators';
import { CreateAuthDto } from 'src/domain/dtos';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/domain/entities';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get('/who-am-i')
  whoAmI(@CurrentUser() user: Omit<UserEntity, 'password'>) {
    return user;
  }
}
