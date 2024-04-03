import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSellerSupplierDto {
  @IsUUID()
  @IsNotEmpty()
  sellerId: string;

  @IsUUID()
  @IsNotEmpty()
  supplierId: string;
}
