import { Specification } from '@prisma/client';

export class SpecificationEntity implements Specification {
  id: string;
  buildingArea: string;
  totalArea: string;
  isFurnished: boolean;
  isBuilding: boolean;
  buildingContext: string | null;
  isAcceptExchange: boolean;
  exchangeContext: string | null;
  productId: string;
  locations: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
