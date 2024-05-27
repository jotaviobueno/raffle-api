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
  CreateTicketStatusDto,
  SearchTicketStatusDto,
  UpdateTicketStatusDto,
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
import { RoleGuard } from '../../role/guards';
import { Permissions, Roles } from '../../role/decorators';
import { PERMISSION_ENUM, ROLE_ENUM } from 'src/common/enums';
import { TicketStatusEntity } from 'src/domain/entities';
import { ApiOkFindAllResult } from 'src/common/decorators';
import { TicketStatusService } from '../services/ticket-status.service';

@Controller('ticket-status')
@ApiTags('ticket-status')
@UseGuards(RoleGuard)
@Roles(ROLE_ENUM.ADMIN, ROLE_ENUM.DEV)
@ApiBearerAuth('defaultBearerAuth')
export class TicketStatusController {
  constructor(private readonly ticketStatusService: TicketStatusService) {}

  @Post()
  @Permissions(PERMISSION_ENUM.CAN_CREATE_TICKET_STATUS)
  @ApiCreatedResponse({ type: TicketStatusEntity })
  @ApiBody({ type: CreateTicketStatusDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  create(@Body() createTicketStatusDto: CreateTicketStatusDto) {
    return this.ticketStatusService.create(createTicketStatusDto);
  }

  @Get()
  @Permissions(PERMISSION_ENUM.CAN_READ_TICKET_STATUS)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @ApiOkFindAllResult(TicketStatusEntity)
  findAll(@Query() queryParams: SearchTicketStatusDto) {
    return this.ticketStatusService.findAll(queryParams);
  }

  @Get(':id')
  @Permissions(PERMISSION_ENUM.CAN_READ_TICKET_STATUS)
  @ApiOkResponse({ type: TicketStatusEntity })
  @ApiNotFoundResponse()
  findById(@Param('id') id: string) {
    return this.ticketStatusService.findById(id);
  }

  @Patch(':id')
  @Permissions(PERMISSION_ENUM.CAN_UPDATE_TICKET_STATUS)
  @ApiOkResponse({ type: TicketStatusEntity })
  @ApiBody({ type: UpdateTicketStatusDto })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  update(
    @Param('id') id: string,
    @Body() updateTicketStatusDto: UpdateTicketStatusDto,
  ) {
    return this.ticketStatusService.update({ ...updateTicketStatusDto, id });
  }

  @Delete(':id')
  @Permissions(PERMISSION_ENUM.CAN_DELETE_TICKET_STATUS)
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse()
  @ApiNotAcceptableResponse()
  @ApiUnauthorizedResponse()
  remove(@Param('id') id: string) {
    return this.ticketStatusService.remove(id);
  }
}
