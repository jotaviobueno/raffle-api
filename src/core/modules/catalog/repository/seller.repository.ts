import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateSellerDto, UpdateSellerDto } from 'src/domain/dtos';
import { QueryBuilderEntity, SellerEntity } from 'src/domain/entities';

@Injectable()
export class SellerRepository extends RepositoryFactory<
  SellerEntity,
  CreateSellerDto & { favicon: string; logo: string },
  UpdateSellerDto & { favicon?: string; logo?: string }
> {
  constructor() {
    super('seller');
  }

  findAll(query: QueryBuilderEntity): Promise<SellerEntity[]> {
    return this.prismaService.seller.findMany(query);
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
