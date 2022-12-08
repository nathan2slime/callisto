// Dependencies
import { config } from 'dotenv';

config();

const envs = {
  DB_CLIENT: `${process.env.DB_CLIENT}`,
  DB_PASSWORD: `${process.env.DB_PASSWORD}`,
  DB_NAME: `${process.env.DB_NAME}`,
  DB_USER: `${process.env.DB_USER}`,
  DB_HOST: `${process.env.DB_HOST}`,
  PORT: `${process.env.PORT}`,
  NODE_ENV: `${process.env.NODE_ENV}`,
  TOKEN_KEY: `${process.env.TOKEN_KEY}`,
  PASSWORD_HASH_SALT: `${process.env.PASSWORD_HASH_SALT}`,
  TOKEN_HASH: `${process.env.TOKEN_HASH}`,
  ADMIN_EMAIL: `${process.env.ADMIN_EMAIL}`,
  ADMIN_PASSWORD: `${process.env.ADMIN_PASSWORD}`,
};

export default envs;
