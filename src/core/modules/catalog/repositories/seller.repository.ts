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
  Omit<CreateSellerDto & { logo: string }, 'addressId'>,
  Omit<UpdateSellerDto & { logo?: string }, 'addressId'>
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
        socialMedias: true,
        theme: true,
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
