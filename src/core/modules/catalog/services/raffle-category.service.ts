import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import {
  CreateRaffleCategoryDto,
  UpdateRaffleCategoryDto,
} from 'src/domain/dtos';
import { RaffleCategoryEntity } from 'src/domain/entities';
import { RaffleCategoryRepository } from '../repository/raffle-category.repository';
import { RaffleService } from './raffle.service';
import { CategoryService } from './category.service';

@Injectable()
export class RaffleCategoryService
  implements
    ServiceBase<
      RaffleCategoryEntity,
      CreateRaffleCategoryDto,
      UpdateRaffleCategoryDto
    >
{
  constructor(
    private readonly raffleCategoryRepository: RaffleCategoryRepository,
    private readonly raffleService: RaffleService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(dto: CreateRaffleCategoryDto): Promise<RaffleCategoryEntity> {
    const raffle = await this.raffleService.findById(dto.raffleId);

    const category = await this.categoryService.findById(dto.categoryId);

    const raffleCategoryAlreadyExist =
      await this.raffleCategoryRepository.findByRaffleIdAndCategoryId(
        raffle.id,
        category.id,
      );

    if (raffleCategoryAlreadyExist)
      throw new HttpException(
        'this raffle already have this category',
        HttpStatus.CONFLICT,
      );

    const raffleCategory = await this.raffleCategoryRepository.create(dto);

    return raffleCategory;
  }

  async findById(id: string): Promise<RaffleCategoryEntity> {
    const raffleCategory = await this.raffleCategoryRepository.findById(id);

    if (!raffleCategory)
      throw new HttpException(
        'Raffle category not found',
        HttpStatus.NOT_FOUND,
      );

    return raffleCategory;
  }

  async update(dto: UpdateRaffleCategoryDto): Promise<RaffleCategoryEntity> {
    const raffleCategory = await this.findById(dto.id);

    if (dto.categoryId) {
      const category = await this.categoryService.findById(dto.categoryId);

      const raffleCategoryAlreadyExist =
        await this.raffleCategoryRepository.findByRaffleIdAndCategoryId(
          raffleCategory.raffleId,
          category.id,
        );

      if (raffleCategoryAlreadyExist)
        throw new HttpException(
          'this raffle already have this category',
          HttpStatus.CONFLICT,
        );
    }

    if (dto.raffleId) {
      const raffle = await this.raffleService.findById(dto.raffleId);

      const raffleCategoryAlreadyExist =
        await this.raffleCategoryRepository.findByRaffleIdAndCategoryId(
          raffle.id,
          raffleCategory.categoryId,
        );

      if (raffleCategoryAlreadyExist)
        throw new HttpException(
          'this raffle already have this category',
          HttpStatus.CONFLICT,
        );
    }

    const update = await this.raffleCategoryRepository.update(dto);

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const raffleCategory = await this.findById(id);

    const remove = await this.raffleCategoryRepository.softDelete(
      raffleCategory.id,
    );

    if (!remove)
      throw new HttpException('failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
