import { ApiProperty } from '@nestjs/swagger';
import { SocialMediaEntity } from '../social-media';
import { SellerEntity } from './seller.entity';
import { ThemeWithRelationsEntity } from '../theme';

export class SellerWithRelationsEntity extends SellerEntity {
  @ApiProperty({ type: [SocialMediaEntity] })
  socialMedias: SocialMediaEntity[];

  @ApiProperty({ type: ThemeWithRelationsEntity })
  theme: ThemeWithRelationsEntity;
}
