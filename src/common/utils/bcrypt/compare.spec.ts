import * as bcrypt from 'bcrypt';
import { compare } from './compare';

jest.mock('bcrypt');

describe('compare function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call bcrypt.compare with correct arguments', async () => {
    const password = 'password';
    const hash = 'hashedPassword';

    await compare(password, hash);

    expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
  });

  it('should return true if bcrypt.compare resolves true', async () => {
    const password = 'password';
    const hash = 'hashedPassword';

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);

    const result = await compare(password, hash);

    expect(result).toBe(true);
  });

  it('should return false if bcrypt.compare resolves false', async () => {
    const password = 'password';
    const hash = 'hashedPassword';

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);

    const result = await compare(password, hash);

    expect(result).toBe(false);
  });
});
