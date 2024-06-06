import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { ThemeEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class ThemeRepository extends RepositoryFactory<ThemeEntity> {
  constructor() {
    super('theme');
  }

  findAll(query: QueryBuilderEntity): Promise<ThemeEntity[]> {
    return this.prismaService.theme.findMany(query);
  }

  findById(id: string): Promise<ThemeEntity | null> {
    return this.prismaService.theme.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findByCode(code: string): Promise<ThemeEntity | null> {
    return this.prismaService.theme.findFirst({
      where: {
        code,
        deletedAt: null,
      },
    });
  }
}
