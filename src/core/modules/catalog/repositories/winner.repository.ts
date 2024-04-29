import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateWinnerDto } from 'src/domain/dtos';
import { QueryBuilderEntity, WinnerEntity } from 'src/domain/entities';

@Injectable()
export class WinnerRepository extends RepositoryFactory<
  WinnerEntity,
  CreateWinnerDto & { customerId: string }
> {
  constructor() {
    super('winner');
  }

  findAll(query: QueryBuilderEntity): Promise<WinnerEntity[]> {
    return this.prismaService.winner.findMany(query);
  }

  findById(id: string): Promise<WinnerEntity | null> {
    return this.prismaService.winner.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
