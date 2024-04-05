import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateRaffleDto, UpdateRaffleDto } from 'src/domain/dtos';
import { RaffleEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class RaffleRepository extends RepositoryFactory<
  RaffleEntity,
  CreateRaffleDto,
  UpdateRaffleDto
> {
  constructor() {
    super('raffle');
  }

  findAll(query: QueryBuilderEntity): Promise<RaffleEntity[]> {
    return this.prismaService.raffle.findMany(query);
  }

  findById(id: string): Promise<RaffleEntity | null> {
    return this.prismaService.raffle.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
