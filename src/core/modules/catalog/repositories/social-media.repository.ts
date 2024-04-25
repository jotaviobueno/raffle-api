import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateSocialMediaDto, UpdateSocialMediaDto } from 'src/domain/dtos';
import { QueryBuilderEntity, SocialMediaEntity } from 'src/domain/entities';

@Injectable()
export class SocialMedialRepository extends RepositoryFactory<
  SocialMediaEntity,
  CreateSocialMediaDto,
  UpdateSocialMediaDto
> {
  constructor() {
    super('socialMedia');
  }

  findAll(query: QueryBuilderEntity): Promise<SocialMediaEntity[]> {
    return this.prismaService.socialMedia.findMany(query);
  }

  findById(id: string): Promise<SocialMediaEntity | null> {
    return this.prismaService.socialMedia.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
