import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateAddressDto, UpdateAddressDto } from 'src/domain/dtos';
import { AddressEntity } from 'src/domain/entities';

@Injectable()
export class AddressRepository extends RepositoryFactory<
  AddressEntity,
  CreateAddressDto,
  UpdateAddressDto
> {
  constructor() {
    super('address');
  }

  findById(id: string): Promise<AddressEntity | null> {
    return this.prismaService.address.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }
}
