import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { QueryBuilderEntity, StateEntity } from 'src/domain/entities';

@Injectable()
export class StateRepository extends RepositoryFactory<StateEntity> {
  constructor() {
    super('state');
  }

  findAll(query: QueryBuilderEntity): Promise<StateEntity[]> {
    return this.prismaService.state.findMany(query);
  }

  findById(id: string): Promise<StateEntity | null> {
    return this.prismaService.state.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
