import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRaffleDto } from './create-raffle.dto';

export class UpdateRaffleDto extends PartialType(
  OmitType(CreateRaffleDto, ['sellerId']),
) {
  id: string;
}
