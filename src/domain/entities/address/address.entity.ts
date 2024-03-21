import { Address } from '@prisma/client';

export class AddressEntity implements Address {
  id: string;
  street: string;
  reference: string | null;
  complement: string | null;
  neighborhood: string;
  countryId: string;
  stateId: string;
  userId: string | null;
  sellerId: string | null;
  postcode: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
