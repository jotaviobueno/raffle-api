import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateRaffleDto } from './create-raffle.dto';

export class UpdateRaffleDto extends PartialType(
  OmitType(CreateRaffleDto, ['sellerId']),
) {
  id: string;
}
