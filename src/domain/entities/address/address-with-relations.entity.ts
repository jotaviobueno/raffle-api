import { ApiProperty } from '@nestjs/swagger';
import { StateEntity } from '../state';
import { AddressEntity } from './address.entity';

export class AddressWithRelationsEntity extends AddressEntity {
  @ApiProperty({ type: StateEntity })
  state: StateEntity;
}
