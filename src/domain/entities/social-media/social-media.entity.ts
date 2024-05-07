import { ApiProperty } from '@nestjs/swagger';
import { SocialMedia } from '@prisma/client';

export class SocialMediaEntity implements SocialMedia {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  href: string;

  @ApiProperty()
  sellerId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
