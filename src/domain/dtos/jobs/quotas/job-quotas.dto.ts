import { RaffleEntity } from 'src/domain/entities';
import { CreateQuotasDto } from '../../quotas';

export class JobQuotasDto {
  raffle: RaffleEntity;
  dto: CreateQuotasDto;
}
