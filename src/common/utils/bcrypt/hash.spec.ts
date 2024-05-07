import * as bcrypt from 'bcrypt';
import { hash } from './hash';

jest.mock('bcrypt');

describe('hash function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call bcrypt.hash with correct arguments', async () => {
    const password = 'password';
    const salt = 10;

    await hash(password, salt);

    expect(bcrypt.hash).toHaveBeenCalledWith(password, salt);
  });

  it('should call bcrypt.hash with default salt if not provided', async () => {
    const password = 'password';
    const defaultSalt = 10;

    await hash(password);

    expect(bcrypt.hash).toHaveBeenCalledWith(password, defaultSalt);
  });
});
