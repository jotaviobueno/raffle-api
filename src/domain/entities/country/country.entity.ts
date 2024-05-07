import { ApiProperty } from '@nestjs/swagger';
import { Country } from '@prisma/client';

export class CountryEntity implements Country {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  iso3: string;

  @ApiProperty()
  iso2: string;

  @ApiProperty({ nullable: true })
  intermediaryRegion: string | null;

  @ApiProperty({ nullable: true })
  subRegion: string | null;

  @ApiProperty({ nullable: true })
  continent: string | null;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
