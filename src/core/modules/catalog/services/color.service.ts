import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateColorDto, UpdateColorDto } from 'src/domain/dtos';
import { ColorEntity } from 'src/domain/entities';
import { ColorRepository } from '../repositories/color.repository';

@Injectable()
export class ColorService
  implements ServiceBase<ColorEntity, CreateColorDto, UpdateColorDto>
{
  constructor(private readonly colorRepository: ColorRepository) {}

  async create(dto: CreateColorDto): Promise<ColorEntity> {
    const color = await this.colorRepository.create(dto);

    return color;
  }

  async findById(id: string): Promise<ColorEntity> {
    const color = await this.colorRepository.findById(id);

    if (!color)
      throw new HttpException('Color not found', HttpStatus.NOT_FOUND);

    return color;
  }

  async update(dto: UpdateColorDto): Promise<ColorEntity> {
    const color = await this.findById(dto.id);

    const update = await this.colorRepository.update({ ...dto, id: color.id });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }
}
