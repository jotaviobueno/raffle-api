import { Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateRaffleFileDto } from 'src/domain/dtos';
import { RaffleFileEntity } from 'src/domain/entities';
import { RaffleFileRepository } from '../repositories/raffle-file.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class RaffleFileService
  implements ServiceBase<RaffleFileEntity, CreateRaffleFileDto>
{
  constructor(private readonly raffleFileRepository: RaffleFileRepository) {}

  createMany(dto: CreateRaffleFileDto[]): Promise<Prisma.BatchPayload> {
    return this.raffleFileRepository.createMany(dto);
  }
}
