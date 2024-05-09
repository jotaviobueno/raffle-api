import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { ThemeRepository } from '../repositories/theme.repository';
import { ThemeEntity } from 'src/domain/entities';
import { CreateThemeDto, UpdateThemeDto } from 'src/domain/dtos';

@Injectable()
export class ThemeService
  implements ServiceBase<ThemeEntity, CreateThemeDto, UpdateThemeDto>
{
  constructor(private readonly themeRepository: ThemeRepository) {}

  async create(dto: CreateThemeDto): Promise<ThemeEntity> {
    const theme = await this.themeRepository.create(dto);

    return theme;
  }

  async findById(id: string): Promise<ThemeEntity> {
    const theme = await this.themeRepository.findById(id);

    if (!theme)
      throw new HttpException('Theme not found', HttpStatus.NOT_FOUND);

    return theme;
  }

  async update(dto: UpdateThemeDto): Promise<ThemeEntity> {
    const theme = await this.findById(dto.id);

    const update = await this.themeRepository.update({ ...dto, id: theme.id });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
