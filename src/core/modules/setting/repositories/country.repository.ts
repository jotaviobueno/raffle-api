import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CountryEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class CountryRepository extends RepositoryFactory<CountryEntity> {
  constructor() {
    super('country');
  }

  findAll(query: QueryBuilderEntity): Promise<CountryEntity[]> {
    return this.prismaService.country.findMany(query);
  }

  findById(id: string): Promise<CountryEntity | null> {
    return this.prismaService.country.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
