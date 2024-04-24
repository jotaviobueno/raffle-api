import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateSellerDto } from './create-seller.dto';

export class UpdateSellerDto extends PartialType(
  OmitType(CreateSellerDto, ['userId']),
) {
  id: string;
}
