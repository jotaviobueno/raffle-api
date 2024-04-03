import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSellerCustomerDto {
  @IsUUID()
  @IsNotEmpty()
  sellerId: string;

  @IsUUID()
  @IsNotEmpty()
  customerId: string;
}
