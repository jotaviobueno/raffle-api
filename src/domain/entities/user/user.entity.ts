import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  name: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
