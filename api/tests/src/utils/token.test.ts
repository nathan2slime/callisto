// Dependencies
import { faker } from '@faker-js/faker';

// Utils
import envs from '../../../env';
import { createAuthToken, decodedAuthToken } from '../../../src/utils/token';

describe('token generation', () => {
  const data = {
    id: parseInt(faker.random.numeric()),
  };

  it('should return token when data is passed', () => {
    const token = createAuthToken(data);

    expect(token.includes(envs.TOKEN_KEY)).toBe(true);
    expect(token).not.toBeNull();
  });

  it('should return the date resulting from decoding the token', () => {
    const token = createAuthToken(data);
    const decoded: any = decodedAuthToken(token);

    expect(decoded).toHaveProperty('id');
    expect(decoded.id).toEqual(data.id);
  });

  it('should return token not found error when a token is not passed', () => {
    const error = decodedAuthToken();

    expect(error.message).toBe('Token not found');
  });

  it('should return malformatted token error when a token is malformatted', () => {
    const error = decodedAuthToken(faker.name.firstName());

    expect(error.message).toBe('Malformatted token');
  });

  it('should return token invalid error when a token is invalid', () => {
    const token = createAuthToken(data);

    const error = decodedAuthToken(token + faker.name.firstName());

    expect(error.message).toBe('Invalid token');
  });
});
