import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateRaffleFileDto } from 'src/domain/dtos';
import { RaffleFileEntity } from 'src/domain/entities';

@Injectable()
export class RaffleFileRepository extends RepositoryFactory<
  RaffleFileEntity,
  CreateRaffleFileDto
> {
  constructor() {
    super('raffleFile');
  }
}
