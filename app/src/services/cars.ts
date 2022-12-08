import api from '../api';

export type FilterCar =
  | {
      title: string;
      slug: string;
    }
  | undefined;

export type ItemCar = {
  id: number;
  currency: string;
} & CreateCarData;

export type CreateCarData = {
  name: string;
  brand: string;
  model: string;
  photo: string;
  price: number;
};

export type ResponseCars = {
  data: { data: ItemCar[] };
};

export type ResponseCreateCar = ItemCar;

export const removeCarService = async (token: string, id?: number) => {
  try {
    const { data } = await api.delete(`car/delete/${id}`, {
      headers: {
        authorization: token,
      },
    });

    return data;
  } catch (error) {
    return {
      error: true,
      message: 'No internet connection',
    };
  }
};

export const createCarService = async (
  data: CreateCarData,
  token: string
): Promise<ResponseCreateCar | any> => {
  try {
    const res = await api.post<ResponseCreateCar>(
      'car/create',
      { ...data, price: parseFloat(`${data.price}`) },
      {
        headers: {
          authorization: token,
        },
      }
    );

    return res;
  } catch (error) {
    return {
      error: true,
      message: 'No internet connection',
    };
  }
};

export const updateCarService = async (
  data: CreateCarData,
  id: number,
  token: string
): Promise<ResponseCreateCar | any> => {
  try {
    const res = await api.put<ResponseCreateCar>(
      'car/update',
      { ...data, price: parseFloat(`${data.price}`), id },
      {
        headers: {
          authorization: token,
        },
      }
    );

    return res;
  } catch (error) {
    return {
      error: true,
      message: 'No internet connection',
    };
  }
};

export const getAllCars = async (
  filter: FilterCar
): Promise<ResponseCars | any> => {
  try {
    const res = await api.get(`/car/all?order=${filter?.slug}`);

    return res;
  } catch (error) {
    return {
      error: true,
      message: 'No internet connection',
    };
  }
};

export const getCarById = async (id: number): Promise<ItemCar | any> => {
  try {
    const res = await api.get(`/car/${id}`);

    return res;
  } catch (error) {
    return {
      error: true,
      message: 'No internet connection',
    };
  }
};
