import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { userReducer, USER_STATE } from './reducers/user';

export type APP_STATE = {
  user: USER_STATE;
};

const persistConfig: PersistConfig<any> = {
  key: 'app',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const reducer = persistReducer(
  persistConfig,
  combineReducers({ user: userReducer })
);

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
