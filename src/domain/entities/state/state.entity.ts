import { ApiProperty } from '@nestjs/swagger';
import { State } from '@prisma/client';

export class StateEntity implements State {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  code3: string | null;

  @ApiProperty({ nullable: true })
  ibgeId: string | null;

  @ApiProperty()
  region: string;

  @ApiProperty()
  countryId: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
