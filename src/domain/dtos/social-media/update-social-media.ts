import { PartialType } from '@nestjs/mapped-types';
import { OmitType } from '@nestjs/swagger';
import { CreateSocialMediaDto } from './create-social-media';

export class UpdateSocialMediaDto extends PartialType(
  OmitType(CreateSocialMediaDto, ['sellerId']),
) {
  id: string;
}
