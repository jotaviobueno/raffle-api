import { User, USER_ROLE } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  role: USER_ROLE;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
