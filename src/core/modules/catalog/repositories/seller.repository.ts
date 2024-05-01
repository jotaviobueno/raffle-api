import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateSellerDto, UpdateSellerDto } from 'src/domain/dtos';
import {
  QueryBuilderEntity,
  SellerEntity,
  SellerWithRelationsEntity,
} from 'src/domain/entities';

@Injectable()
export class SellerRepository extends RepositoryFactory<
  SellerEntity,
  CreateSellerDto & { logo: string },
  UpdateSellerDto & { logo?: string }
> {
  constructor() {
    super('seller');
  }

  findAll(query: QueryBuilderEntity): Promise<SellerEntity[]> {
    return this.prismaService.seller.findMany(query);
  }

  findByIdAndPopulate(id: string): Promise<SellerWithRelationsEntity | null> {
    return this.prismaService.seller.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        raffles: {
          where: {
            isActive: true,
            isVisible: true,
            deletedAt: null,
          },
        },
        socialMedias: true,
      },
    });
  }

  findById(id: string): Promise<SellerEntity | null> {
    return this.prismaService.seller.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
