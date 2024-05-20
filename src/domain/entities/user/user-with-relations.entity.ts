import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEntity, UserRoleWithRelationsEntity } from '../user-role';
import { UserEntity } from './user.entity';
import { OmitType } from '@nestjs/mapped-types';
import { SellerEntity } from '../seller';

export class UserWithRelationsEntity extends OmitType(UserEntity, [
  'password',
]) {
  @ApiProperty({ type: [UserRoleEntity] })
  userRoles: UserRoleWithRelationsEntity[];

  @ApiProperty({ type: [SellerEntity] })
  sellers: SellerEntity[];
}
