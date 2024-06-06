import { ApiProperty } from '@nestjs/swagger';
import { Theme } from '@prisma/client';

export class ThemeEntity implements Theme {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
