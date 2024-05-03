import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  mobilePhone: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  password: string;

  @ApiProperty({ nullable: true })
  phone: string | null;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  document: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
