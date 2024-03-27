import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateAttributeDto } from './create-attribute.dto';

export class UpdateAttributeDto extends PartialType(
  OmitType(CreateAttributeDto, ['sellerId']),
) {
  id: string;
}
