import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

// TODO: pensar melhor construir isso com base no cart, receber apenas o cartId e criar a order e as outras informações
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
