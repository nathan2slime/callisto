import { AnyAction } from '@reduxjs/toolkit';

export type USER_STATE = {
  logged: boolean;
  data?: {
    id?: number;
    email?: string;
    name?: string;
    admin?: string;
    deleted_at?: string;
    created_at?: string;
    updated_at?: string;
  };
  token?: string;
};
const INITIAL: USER_STATE = {
  logged: false,
};

export const userReducer = (state = INITIAL, action: AnyAction): USER_STATE => {
  switch (action.type) {
    case 'SET':
      const { data } = action.payload;

      return {
        ...state,
        ...action.payload,
        data: { ...data, admin: data?.admin == 'true' },
      };

    default:
      return state;
  }
};
