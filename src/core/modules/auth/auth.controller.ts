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
import { UserEntity } from 'src/domain/entities';
import { IsPublic } from './decorators';
import { CreateAuthDto } from 'src/domain/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get('/who-am-i')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  whoAmI(@CurrentUser() { password, ...user }: UserEntity) {
    return user;
  }
}
