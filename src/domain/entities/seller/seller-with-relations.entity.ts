import { ApiProperty } from '@nestjs/swagger';
import { SocialMediaEntity } from '../social-media';
import { SellerEntity } from './seller.entity';
import { ColorEntity, ColorWithRelationsEntity } from '../color';

export class SellerWithRelationsEntity extends SellerEntity {
  @ApiProperty({ type: [SocialMediaEntity] })
  socialMedias: SocialMediaEntity[];

  @ApiProperty({ type: ColorEntity })
  color: ColorWithRelationsEntity;
}
