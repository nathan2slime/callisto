import { USER_STATE } from '../reducers/user';

export const setUser = (payload: USER_STATE) => ({
  payload,
  type: 'SET',
});
