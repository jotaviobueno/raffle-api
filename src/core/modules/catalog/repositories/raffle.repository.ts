import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateRaffleDto, UpdateRaffleDto } from 'src/domain/dtos';
import {
  RaffleEntity,
  QueryBuilderEntity,
  RaffleWithRelationsEntity,
  raffleQueryWithRelations,
} from 'src/domain/entities';

@Injectable()
export class RaffleRepository extends RepositoryFactory<
  RaffleEntity,
  Omit<
    CreateRaffleDto & {
      digits: number;
      final: number;
    },
    'filesIds'
  >,
  Omit<
    UpdateRaffleDto & {
      digits?: number;
      isFinished?: boolean;
    },
    'filesIds'
  >
> {
  constructor() {
    super('raffle');
  }

  findAll(query: QueryBuilderEntity): Promise<RaffleWithRelationsEntity[]> {
    return this.prismaService.raffle.findMany({
      ...query,
      include: {
        ...raffleQueryWithRelations,
      },
    });
  }

  findById(id: string): Promise<RaffleWithRelationsEntity | null> {
    return this.prismaService.raffle.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        ...raffleQueryWithRelations,
      },
    });
  }
}
