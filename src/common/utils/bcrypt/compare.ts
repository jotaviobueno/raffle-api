import * as bcrypt from 'bcrypt';

export function compare(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
