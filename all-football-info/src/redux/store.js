import { configureStore } from '@reduxjs/toolkit';
import { footballApi } from '../api/footballApi';

const store = configureStore({
  reducer: {
    [footballApi.reducerPath]: footballApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(footballApi.middleware),
});

export default store;