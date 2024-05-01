import { ApiProperty } from '@nestjs/swagger';
import { RaffleEntity } from '../raffle';
import { SocialMediaEntity } from '../social-media';
import { SellerEntity } from './seller.entity';

export class SellerWithRelationsEntity extends SellerEntity {
  @ApiProperty({ type: [RaffleEntity] })
  raffles: RaffleEntity[];

  @ApiProperty({ type: [SocialMediaEntity] })
  socialMedias: SocialMediaEntity[];
}
