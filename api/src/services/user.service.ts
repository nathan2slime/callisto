// Utils
import connection from '../database';
import log from '../log';

// Types
import { CreateUser, User } from '../types';

class UserService {
  emailValidation = async (email: string) => {
    const [user] = await connection('users').where({ email });

    if (user) {
      log.warn('user alredy exists');

      return new Error('User alredy exists');
    }

    return;
  };

  create = async (user: CreateUser) => {
    if (!user) {
      throw new Error('Empty user data');
    }

    await connection('users').insert(user);

    log.complete('created user', user.email);

    return;
  };

  getUserByEmail = async (email: string): Promise<User> => {
    const [user] = await connection('users').where({ email: email });

    if (!user) {
      log.warn('user not found');

      throw new Error('User not found');
    }

    log.complete('user found by email', user);

    return user;
  };

  getUserById = async (id: number): Promise<User> => {
    const [user] = await connection('users').where({ id });

    if (!user) {
      log.warn('user not found');

      throw new Error('User not found');
    }

    user.password = undefined;

    log.complete('user found by id', user);

    return user;
  };
}

export default UserService;
