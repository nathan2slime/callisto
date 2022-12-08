import api from '../api';

export type DataLogin = {
  email: string;
  password: string;
};

export type DataSignup = {
  email: string;
  name: string;
  password: string;
};

export const loginService = async (login: DataLogin) => {
  try {
    const { data } = await api.post('user/login', login);

    return data;
  } catch (error) {
    return {
      error: true,
      message: 'No internet connection',
    };
  }
};

export const signupService = async (signup: DataSignup) => {
  try {
    const { data } = await api.post('user/create', signup);

    return data;
  } catch (error) {
    return {
      error: true,
      message: 'No internet connection',
    };
  }
};
