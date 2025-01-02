import { configureStore } from '@reduxjs/toolkit';
import {CreateAPI} from '../services/api.ts';
import cityReducer from '../slices/city-slice.ts';
import offersReducer from '../slices/offers-slice.ts';
import authReducer from '../slices/authorization-slice.ts';

export const api = CreateAPI();
export const store = configureStore({
  reducer: {
    city: cityReducer,
    offers: offersReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
