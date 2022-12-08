// Dependencies
import { Knex } from 'knex';

const table = 'users';

export const up = async (knex: Knex): Promise<void> =>
  knex.schema.createTable(table, table => {
    table.increments('id');
    table.string('email').notNullable().unique();
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.string('admin').defaultTo(false);
    table.timestamp('deleted_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.primary(['id']);
  });

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable(table);
