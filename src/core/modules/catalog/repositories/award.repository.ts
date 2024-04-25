import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateAwardDto, UpdateAwardDto } from 'src/domain/dtos';
import { AwardEntity, QueryBuilderEntity } from 'src/domain/entities';

@Injectable()
export class AwardRepository extends RepositoryFactory<
  AwardEntity,
  CreateAwardDto,
  UpdateAwardDto
> {
  constructor() {
    super('award');
  }

  findAll(query: QueryBuilderEntity): Promise<AwardEntity[]> {
    return this.prismaService.award.findMany(query);
  }

  findById(id: string): Promise<AwardEntity | null> {
    return this.prismaService.award.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
