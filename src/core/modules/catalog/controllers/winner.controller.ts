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
import { Roles } from '../../role/decorators';
import { ROLE_ENUM } from 'src/common/enums';
import { WinnerEntity } from 'src/domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';
import { WinnerService } from '../services/winner.service';

@Controller('winner')
@ApiTags('winner')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
@ApiBearerAuth('defaultBearerAuth')
export class WinnerController {
  constructor(private readonly winnerService: WinnerService) {}

  @Post()
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
  @CacheTTL(15)
  @IsPublic()
  @ApiOkFindAllResult(WinnerEntity)
  findAll(@Query() queryParams: SearchWinnerDto) {
    return this.winnerService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOkResponse({ type: WinnerEntity })
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  findById(@Param('id') id: string) {
    return this.winnerService.findById(id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  remove(@Param('id') id: string) {
    return this.winnerService.remove(id);
  }
}
