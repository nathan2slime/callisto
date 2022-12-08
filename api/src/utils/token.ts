// Dependencies
import jwt from 'jsonwebtoken';

// Types
import { AuthTokenData } from '../types';

// Utils
import envs from '../../env';
import log from '../log';

export const createAuthToken = (data: AuthTokenData) => {
  const token = jwt.sign(data, envs.TOKEN_HASH);

  log.complete('create auth token for', data);

  return `${envs.TOKEN_KEY} ${token}`;
};

export const decodedAuthToken = (token?: string) => {
  try {
    if (!token || token?.trim() == '') {
      throw new Error('Token not found');
    } else if (!token.includes(envs.TOKEN_KEY)) {
      throw new Error('Malformatted token');
    }

    try {
      const data = jwt.verify(
        token.replace(' ', '').split(envs.TOKEN_KEY)[1],
        envs.TOKEN_HASH
      );

      log.success('token verification', data);

      return data;
    } catch (error) {
      throw new Error('Invalid token');
    }
  } catch (error: any) {
    log.error(error.message);

    return error;
  }
};
