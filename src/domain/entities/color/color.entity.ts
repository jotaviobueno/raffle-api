import { ApiProperty } from '@nestjs/swagger';
import { Color } from '@prisma/client';

export class ColorEntity implements Color {
  @ApiProperty()
  id: string;

  @ApiProperty()
  primary: string;

  @ApiProperty()
  secundary: string;

  @ApiProperty()
  text: string;

  @ApiProperty({ nullable: true })
  sellerId: string | null;

  @ApiProperty({ nullable: true })
  parentId: string | null;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
