import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'; 
import { formApi } from './formApi';

export const store = configureStore({
  reducer: {
    [formApi.reducerPath]: formApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(formApi.middleware),
});

setupListeners(store.dispatch);