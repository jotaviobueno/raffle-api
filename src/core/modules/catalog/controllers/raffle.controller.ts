import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateRaffleDto,
  SearchRaffleDto,
  UpdateRaffleDto,
} from 'src/domain/dtos';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RaffleService } from '../services/raffle.service';
import { IsPublic } from '../../auth/decorators';
import { Permissions, Roles } from '../../role/decorators';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/common/enums';
import { RoleGuard } from '../../role/guards';
import { RaffleEntity } from 'src/domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';

@Controller('raffle')
@ApiTags('raffle')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN)
@ApiBearerAuth('defaultBearerAuth')
export class ProductController {
  constructor(private readonly raffleService: RaffleService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_CREATE_RAFFLE)
  @ApiCreatedResponse({ type: RaffleEntity })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  create(@Body() createRaffleDto: CreateRaffleDto) {
    return this.raffleService.create(createRaffleDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @IsPublic()
  @ApiOkFindAllResult(RaffleEntity)
  @ApiUnauthorizedResponse()
  findAll(@Query() queryParams: SearchRaffleDto) {
    return this.raffleService.findAll(queryParams);
  }

  @Get(':id')
  @IsPublic()
  @ApiOkResponse({ type: RaffleEntity })
  @ApiNotFoundResponse()
  findById(@Param('id') id: string) {
    return this.raffleService.findById(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_RAFFLE)
  @ApiBody({
    type: UpdateRaffleDto,
  })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiNotAcceptableResponse()
  @ApiOkResponse({ type: RaffleEntity })
  update(@Param('id') id: string, @Body() updateRaffleDto: UpdateRaffleDto) {
    return this.raffleService.update({ ...updateRaffleDto, id });
  }

  @Delete(':id')
  @Permissions(PERMISSION_ENUM.CAN_DELETE_RAFFLE)
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  remove(@Param('id') id: string) {
    return this.raffleService.remove(id);
  }
}
