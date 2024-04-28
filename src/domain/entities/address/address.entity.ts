import { ApiProperty } from '@nestjs/swagger';
import { Address } from '@prisma/client';

export class AddressEntity implements Address {
  @ApiProperty()
  id: string;

  @ApiProperty()
  street: string;

  @ApiProperty({ nullable: true })
  reference: string | null;

  @ApiProperty()
  number: string;

  @ApiProperty({ nullable: true })
  complement: string | null;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  countryId: string;

  @ApiProperty()
  stateId: string;

  @ApiProperty({ nullable: true })
  userId: string | null;

  @ApiProperty({ nullable: true })
  sellerId: string | null;

  @ApiProperty()
  postcode: string;

  @ApiProperty()
  city: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
