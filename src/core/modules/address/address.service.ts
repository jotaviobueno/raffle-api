import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/common/base';
import { CreateAddressDto, UpdateAddressDto } from 'src/domain/dtos';
import { AddressEntity } from 'src/domain/entities';
import { StateService } from '../setting/services/state.service';
import { CountryService } from '../setting/services/country.service';
import { UserService } from '../user/user.service';
import { AddressRepository } from './address.repository';
import { SellerService } from '../seller/seller.service';

@Injectable()
export class AddressService
  implements ServiceBase<AddressEntity, CreateAddressDto, UpdateAddressDto>
{
  constructor(
    private readonly stateService: StateService,
    private readonly countryService: CountryService,
    private readonly userService: UserService,
    private readonly addressRepository: AddressRepository,
    private readonly sellerService: SellerService,
  ) {}

  async create(dto: CreateAddressDto): Promise<AddressEntity> {
    const country = await this.countryService.findById(dto.countryId);

    const state = await this.stateService.findById(dto.stateId);

    if (dto.userId) await this.userService.findById(dto.userId);

    if (dto.sellerId) await this.userService.findById(dto.sellerId);

    const address = await this.addressRepository.create({
      ...dto,
      countryId: country.id,
      stateId: state.id,
    });

    return address;
  }

  async findById(id: string): Promise<AddressEntity> {
    const address = await this.addressRepository.findById(id);

    if (!address)
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);

    return address;
  }

  async update({ id, ...dto }: UpdateAddressDto): Promise<AddressEntity> {
    const address = await this.findById(id);

    if (dto.countryId) await this.countryService.findById(dto.countryId);

    if (dto.stateId) await this.stateService.findById(dto.stateId);

    if (dto.userId) await this.userService.findById(dto.userId);

    const update = await this.addressRepository.update({
      ...dto,
      id: address.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string): Promise<boolean> {
    const address = await this.findById(id);

    const remove = await this.addressRepository.softDelete(address.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
