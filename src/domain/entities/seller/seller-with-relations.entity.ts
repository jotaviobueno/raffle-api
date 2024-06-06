import { ApiProperty } from '@nestjs/swagger';
import { SocialMediaEntity } from '../social-media';
import { SellerEntity } from './seller.entity';
import { ThemeEntity } from '../theme';

export class SellerWithRelationsEntity extends SellerEntity {
  @ApiProperty({ type: [SocialMediaEntity] })
  socialMedias: SocialMediaEntity[];

  @ApiProperty({ type: ThemeEntity })
  theme: ThemeEntity;
}
