import { TicketHistory } from '@prisma/client';

export class TicketHistoryEntity implements TicketHistory {
  id: string;
  code: string;
  ticketId: string;
  ticketStatusId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
