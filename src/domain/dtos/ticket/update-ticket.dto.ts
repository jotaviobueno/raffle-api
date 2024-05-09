import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto extends PartialType(
  OmitType(CreateTicketDto, ['customerId']),
) {
  id: string;
}
