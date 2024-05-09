import { OmitType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateThemeDto } from './create-theme.dto';

export class UpdateThemeDto extends PartialType(
  OmitType(CreateThemeDto, ['parent', 'sellerId']),
) {
  id: string;
}
