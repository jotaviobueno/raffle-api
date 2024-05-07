import { ApiProperty } from '@nestjs/swagger';
import { UtmCampaign } from '@prisma/client';

export class UtmCampaignEntity implements UtmCampaign {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: String, nullable: true })
  description: string | null;

  @ApiProperty()
  sellerId: string;

  @ApiProperty({ type: Date, nullable: true })
  from: Date | null;

  @ApiProperty({ type: Date, nullable: true })
  to: Date | null;

  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
