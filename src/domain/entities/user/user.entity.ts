import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  mobilePhone: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty({ nullable: true })
  type: $Enums.USER_TYPE | null;

  @ApiProperty()
  email: string;

  password: string;

  @ApiProperty({ nullable: true })
  phone: string | null;

  @ApiProperty()
  avatar: string;

  @ApiProperty({ nullable: true })
  document: string | null;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
