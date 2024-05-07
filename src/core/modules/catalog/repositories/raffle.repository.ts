import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateRaffleDto, UpdateRaffleDto } from 'src/domain/dtos';
import {
  RaffleEntity,
  QueryBuilderEntity,
  RaffleWithRelationsEntity,
} from 'src/domain/entities';

@Injectable()
export class RaffleRepository extends RepositoryFactory<
  RaffleEntity,
  CreateRaffleDto & {
    images: string[];
    digits: number;
    final: number;
    totalNumbers: number;
  },
  UpdateRaffleDto & {
    images?: string[];
    digits?: number;
    totalNumbers?: number;
    isFinished?: boolean;
  }
> {
  constructor() {
    super('raffle');
  }

  findAll(query: QueryBuilderEntity): Promise<RaffleEntity[]> {
    return this.prismaService.raffle.findMany(query);
  }

  findById(id: string): Promise<RaffleWithRelationsEntity | null> {
    return this.prismaService.raffle.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        raffleCategories: {
          include: { category: true },
        },
        winners: true,
        awards: true,
      },
    });
  }
}
