import { OrderPix } from '@prisma/client';

export class OrderPixEntity implements OrderPix {
  id: string;
  orderPaymentId: string;
  copyPaste: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  expiratAt: Date;
}
