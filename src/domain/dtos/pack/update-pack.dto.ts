import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePackDto } from './create-pack.dto';

export class UpdatePackDto extends PartialType(
  OmitType(CreatePackDto, ['raffleId', 'sellerId']),
) {
  id: string;
}
