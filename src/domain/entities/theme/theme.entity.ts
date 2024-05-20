import { ApiProperty } from '@nestjs/swagger';
import { Theme } from '@prisma/client';

export class ThemeEntity implements Theme {
  @ApiProperty()
  id: string;

  @ApiProperty()
  primary: string;

  @ApiProperty()
  secondary: string;

  @ApiProperty()
  tertiary: string;

  @ApiProperty()
  quaternary: string;

  @ApiProperty()
  quinary: string;

  @ApiProperty()
  senary: string;

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
