// Dependencies
import { Knex } from 'knex';

const table = 'cars';

export const up = async (knex: Knex): Promise<void> =>
  knex.schema.createTable(table, table => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('brand').notNullable();
    table.string('model').notNullable();
    table.string('photo').notNullable();
    table.double('price').notNullable();
    table.string('currency').defaultTo('BRL');
    table.timestamp('deleted_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.primary(['id']);
  });

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable(table);
