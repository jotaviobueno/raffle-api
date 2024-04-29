import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  password: string | null;

  @ApiProperty({ nullable: true })
  phone: string | null;

  @ApiProperty()
  avatar: string;

  @ApiProperty({ nullable: true })
  document: string | null;

  @ApiProperty({ type: Date, nullable: true })
  birthDate: Date | null;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date, nullable: true })
  deletedAt: Date | null;
}
