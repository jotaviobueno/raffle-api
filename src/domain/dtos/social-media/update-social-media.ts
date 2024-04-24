import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateSocialMediaDto } from './create-social-media';

export class UpdateSocialMediaDto extends PartialType(
  OmitType(CreateSocialMediaDto, ['sellerId']),
) {
  id: string;
}
