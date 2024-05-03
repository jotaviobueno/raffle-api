import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty({ nullable: true })
  email: string | null;

  password: string | null;

  @ApiProperty()
  mobilePhone: string;

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
