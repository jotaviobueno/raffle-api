import { OmitType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateColorDto } from './create-color.dto';

export class UpdateColorDto extends PartialType(
  OmitType(CreateColorDto, ['parent', 'sellerId']),
) {
  id: string;
}
