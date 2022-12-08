// Dependencies
import knex from 'knex';
import { attachPaginate } from 'knex-paginate';

// Utils
import config from '../../knexfile';

const connection = knex(config);

attachPaginate();

export default connection;
