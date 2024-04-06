import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import {
  CreateRaffleCategoryDto,
  UpdateRaffleCategoryDto,
} from 'src/domain/dtos';
import { RaffleCategoryEntity } from 'src/domain/entities';

@Injectable()
export class RaffleCategoryRepository extends RepositoryFactory<
  RaffleCategoryEntity,
  CreateRaffleCategoryDto,
  UpdateRaffleCategoryDto
> {
  constructor() {
    super('raffleCategory');
  }

  findByRaffleIdAndCategoryId(
    raffleId: string,
    categoryId: string,
  ): Promise<RaffleCategoryEntity | null> {
    return this.prismaService.raffleCategory.findFirst({
      where: {
        raffleId,
        categoryId,
        deletedAt: null,
      },
    });
  }

  findById(id: string): Promise<RaffleCategoryEntity | null> {
    return this.prismaService.raffleCategory.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
