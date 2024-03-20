import { State } from '@prisma/client';

export class StateEntity implements State {
  id: string;
  name: string;
  code3: string | null;
  ibgeId: string | null;
  region: string;
  countryId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
