import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateUtmCampaignDto, UpdateUtmCampaignDto } from 'src/domain/dtos';
import { QueryBuilderEntity, UtmCampaignEntity } from 'src/domain/entities';

@Injectable()
export class UtmCampaignRepository extends RepositoryFactory<
  UtmCampaignEntity,
  CreateUtmCampaignDto,
  UpdateUtmCampaignDto
> {
  constructor() {
    super('utmCampaign');
  }

  findAll(query: QueryBuilderEntity): Promise<UtmCampaignEntity[]> {
    return this.prismaService.utmCampaign.findMany(query);
  }

  findById(id: string): Promise<UtmCampaignEntity | null> {
    return this.prismaService.utmCampaign.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
