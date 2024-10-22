import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@prisma/client';

export class PermissionEntity implements Permission {
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
