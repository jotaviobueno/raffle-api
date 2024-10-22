import { ApiProperty } from '@nestjs/swagger';
import { Seller } from '@prisma/client';

export class SellerEntity implements Seller {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  themeId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  fileId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
