// Dependencies
import { IWithPagination } from 'knex-paginate';

// Utils
import connection from '../database';
import log from '../log';

// Types
import { Car, CreateCar, Paginate, UpdateCar } from '../types';

class CarService {
  create = async (data: CreateCar): Promise<Car | Error> => {
    if (!data) {
      throw new Error('Empty car data');
    }

    const id = (await connection
      .insert(data)
      .returning('id')
      .into('cars')) as number;

    return await this.getById(id);
  };

  show = async (id: number): Promise<Car | Error> => {
    if (!id) {
      throw new Error('Empty car data');
    }

    return await this.getById(id);
  };

  all = async (
    data: Paginate
  ): Promise<IWithPagination<Car[], Paginate> | Error> => {
    const { currentPage, perPage, order } = data;

    return await connection('cars')
      .where({ deleted_at: null })
      .orderBy('created_at', order == 'old' ? 'asc' : 'desc')
      .paginate({
        currentPage,
        perPage,
      });
  };

  update = async (data: CreateCar, id: number): Promise<Car | Error> => {
    if (!data) throw new Error('Empty car data');
    if (!id) throw new Error('Empty car id');

    await connection('cars')
      .update({ ...data, updated_at: connection.fn.now() })
      .where({ id });

    return await this.getById(id);
  };

  delete = async (id: number) => {
    if (!id) throw new Error('Empty car data');

    await this.getById(id);

    await connection('cars')
      .update({ deleted_at: connection.fn.now() })
      .where({ id });

    return { error: false, message: 'Success' };
  };

  getById = async (id: number): Promise<Error | Car> => {
    const [car] = await connection('cars').where({ id, deleted_at: null });

    if (!car) {
      throw new Error('Car not found');
    }

    return car;
  };
}

export default CarService;
