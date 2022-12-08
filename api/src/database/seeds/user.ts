// Dependencies
import { hash } from 'bcrypt';
import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

// Types
import { SeedUser } from '../../types';

// Utils
import envs from '../../../env';
import log from '../../log';

export const seed = async (knex: Knex): Promise<void> => {
  if (envs.NODE_ENV == 'production') return;

  const password = envs.ADMIN_PASSWORD;

  const user: SeedUser = {
    admin: 'true',
    name: 'admin',
    password: await hash(password, parseInt(envs.PASSWORD_HASH_SALT)),
    email: envs.ADMIN_EMAIL,
  };

  const tableName = 'users';

  try {
    await knex(tableName).del();
    await knex(tableName).insert(user);
  } catch (error: any) {
    log.error(error.message);
  }

  user.password = password;

  log.success('admin created', user);
};
