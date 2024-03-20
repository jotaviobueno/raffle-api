import { Country } from '@prisma/client';

export class CountryEntity implements Country {
  id: string;
  name: string;
  iso3: string;
  iso2: string;
  intermediaryRegion: string | null;
  subRegion: string | null;
  continent: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
