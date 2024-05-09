import { PartialType } from '@nestjs/swagger';
import { CreateTicketStatusDto } from './create-ticket-status.dto';

export class UpdateTicketStatusDto extends PartialType(CreateTicketStatusDto) {
  id: string;
}
