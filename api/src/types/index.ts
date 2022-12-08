export type AuthTokenData = {
  id: number;
};

export type SeedUser = {
  name: string;
  password: string;
  email: string;
  admin: string;
};

export type CreateUser = {
  name: string;
  password: string;
  email: string;
};

export type LoginUser = {
  password: string;
  email: string;
};

export type User = {
  id: number;
  name: string;
  password?: string;
  email: string;
  admin: string;
  created_at: string;
  deleted: string;
  updated_at: string;
};

export type CreateCar = {
  name: string;
  model: string;
  brand: string;
  photo: string;
  price: number;
};

export type Paginate = {
  perPage: number;
  currentPage: number;
  order: 'old' | 'recent';
};

export type UpdateCar = {
  name: string;
  model: string;
  id: number;
  brand: string;
  photo: string;
  price: number;
};

export type DeleteCar = {
  id: number;
};

export type Car = {
  id: number;
  name: string;
  model: string;
  brand: string;
  created_at: string;
  deleted: string;
  updated_at: string;
  currency: string;
  price: number;
  photo: string;
};
