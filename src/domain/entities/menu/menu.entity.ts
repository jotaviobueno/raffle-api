import { ApiProperty } from '@nestjs/swagger';
import { Menu } from '@prisma/client';

export class MenuEntity implements Menu {
  @ApiProperty()
  id: string;

  @ApiProperty({ nullable: true })
  label: string | null;

  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  icon: string | null;

  @ApiProperty({ nullable: true })
  href: string | null;

  @ApiProperty({ nullable: true })
  parentId: string | null;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
