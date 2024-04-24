import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  sellerId: string;

  customerId: string;

  invoiceNumber: number;

  invoicePrefix: string;

  @IsString()
  @IsOptional()
  comment: string;

  ip: string;

  userAgent: string;

  orderStatusId: string;

  dueDate: Date;
}
