import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateWinnerDto, SearchWinnerDto } from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators';
import { RoleGuard } from '../../role/guards';
import { Permissions, Roles } from '../../role/decorators';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/common/enums';
import { WinnerEntity } from 'src/domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';
import { WinnerService } from '../services/winner.service';

@Controller('winner')
@ApiTags('winner')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN)
@ApiBearerAuth('defaultBearerAuth')
export class WinnerController {
  constructor(private readonly winnerService: WinnerService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_CREATE_WINNER)
  @ApiCreatedResponse({ type: WinnerEntity })
  @ApiBody({ type: CreateWinnerDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  create(@Body() createWinnerDto: CreateWinnerDto) {
    return this.winnerService.create(createWinnerDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @IsPublic()
  @ApiOkFindAllResult(WinnerEntity)
  findAll(@Query() queryParams: SearchWinnerDto) {
    return this.winnerService.findAll(queryParams);
  }

  @Get(':id')
  @IsPublic()
  @ApiOkResponse({ type: WinnerEntity })
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  findById(@Param('id') id: string) {
    return this.winnerService.findById(id);
  }

  @Delete(':id')
  @Permissions(PERMISSION_ENUM.CAN_DELETE_WINNER)
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  remove(@Param('id') id: string) {
    return this.winnerService.remove(id);
  }
}
