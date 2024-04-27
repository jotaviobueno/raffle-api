import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  asaasCustomerId: string | null;
  phone: string | null;
  avatar: string;
  document: string | null;
  birthDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
