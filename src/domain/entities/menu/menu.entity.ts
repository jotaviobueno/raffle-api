import { Menu } from '@prisma/client';

export class MenuEntity implements Menu {
  id: string;
  label: string | null;
  name: string;
  icon: string | null;
  href: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
