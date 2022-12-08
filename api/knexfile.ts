import { config } from 'dotenv';
import { Knex } from 'knex';

config();

const knexConfig: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: __dirname + '/src/database/migrations',
    name: 'migrations',
  },
  seeds: {
    directory: __dirname + '/src/database/seeds',
  },
};

export default knexConfig;
