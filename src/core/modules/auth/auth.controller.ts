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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  OmitType,
} from '@nestjs/swagger';
import { UserEntity } from 'src/domain/entities';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: CreateAuthDto })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get('/who-am-i')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOkResponse({ type: OmitType(UserEntity, ['password']) })
  @ApiUnauthorizedResponse()
  whoAmI(@CurrentUser() user: Omit<UserEntity, 'password'>) {
    return user;
  }
}
