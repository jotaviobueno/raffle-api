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
  CreateTicketDto,
  SearchAwardDto,
  UpdateAwardDto,
} from 'src/domain/dtos';
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
import { TicketEntity } from 'src/domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';
import { TicketService } from '../services/ticket.service';

@Controller('ticket')
@ApiTags('ticket')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV, ROLE_ENUM.PLAN_1)
@ApiBearerAuth('defaultBearerAuth')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @IsPublic()
  @ApiCreatedResponse({ type: TicketEntity })
  @ApiBody({ type: CreateTicketDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @ApiOkFindAllResult(TicketEntity)
  findAll(@Query() queryParams: SearchAwardDto) {
    return this.ticketService.findAll(queryParams);
  }

  @Get(':id')
  @ApiOkResponse({ type: TicketEntity })
  @ApiNotFoundResponse()
  @IsPublic()
  findById(@Param('id') id: string) {
    return this.ticketService.findById(id);
  }

  @Patch(':id')
  @IsPublic()
  @ApiOkResponse({ type: TicketEntity })
  @ApiBody({ type: UpdateAwardDto })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  update(@Param('id') id: string, @Body() updateAwardDto: UpdateAwardDto) {
    return this.ticketService.update({ ...updateAwardDto, id });
  }

  @Delete(':id')
  @IsPublic()
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  remove(@Param('id') id: string) {
    return this.ticketService.remove(id);
  }
}
